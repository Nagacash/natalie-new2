const TRACK_SRC = '/sound/lateral-drift.mp3'
export const AMBIENT_STORAGE_KEY = 'natalie-ambient-music'
export const AMBIENT_VOLUME = 0.28

type Listener = (playing: boolean) => void

function isLocaleSwitcherTarget(target: EventTarget | null) {
  return target instanceof Element && target.closest('[data-locale-switcher]') != null
}

class AmbientAudioController {
  private audio: HTMLAudioElement | null = null
  private listeners = new Set<Listener>()
  private userPaused = false
  private unlocked = false
  private pendingUnmute = false
  private playing = false
  private initialized = false
  private removeUnlockListeners: (() => void) | null = null

  subscribe(listener: Listener) {
    this.listeners.add(listener)
    listener(this.playing)
    return () => {
      this.listeners.delete(listener)
    }
  }

  isPlaying() {
    return this.playing
  }

  private notify() {
    for (const listener of this.listeners) {
      listener(this.playing)
    }
  }

  private getAudio() {
    if (typeof window === 'undefined') return null

    if (!this.audio) {
      this.audio = new Audio(TRACK_SRC)
      this.audio.loop = true
      this.audio.preload = 'auto'
      this.audio.volume = AMBIENT_VOLUME
    }

    return this.audio
  }

  private markPlaying() {
    const audio = this.getAudio()
    if (!audio) return

    audio.volume = AMBIENT_VOLUME
    this.playing = true
    this.unlocked = true
    sessionStorage.setItem(AMBIENT_STORAGE_KEY, '1')
    this.notify()
  }

  async startPlayback(fromUserGesture = false) {
    if (this.userPaused) return false

    const audio = this.getAudio()
    if (!audio) return false

    if (fromUserGesture || !this.pendingUnmute) {
      try {
        audio.muted = false
        audio.volume = AMBIENT_VOLUME
        await audio.play()
        this.pendingUnmute = false
        this.markPlaying()
        return true
      } catch {
        if (fromUserGesture) {
          this.playing = false
          this.notify()
          return false
        }
      }
    }

    try {
      audio.muted = true
      audio.volume = AMBIENT_VOLUME
      await audio.play()
      this.pendingUnmute = true
      this.markPlaying()
      return true
    } catch {
      this.playing = false
      this.notify()
      return false
    }
  }

  pause(fromUser = true) {
    const audio = this.getAudio()
    audio?.pause()
    this.playing = false
    this.notify()

    if (fromUser) {
      this.userPaused = true
      sessionStorage.setItem(AMBIENT_STORAGE_KEY, '0')
    }
  }

  toggle() {
    if (this.playing) {
      this.pause(true)
      return
    }

    this.userPaused = false
    sessionStorage.setItem(AMBIENT_STORAGE_KEY, '1')
    void this.startPlayback(true)
  }

  init() {
    if (this.initialized || typeof window === 'undefined') return
    this.initialized = true

    if (sessionStorage.getItem(AMBIENT_STORAGE_KEY) === '0') {
      this.userPaused = true
    }

    const removeUnlockListeners = () => {
      window.removeEventListener('pointerdown', onUnlock)
      window.removeEventListener('touchstart', onUnlock)
      window.removeEventListener('keydown', onUnlock)
      window.removeEventListener('scroll', onUnlock, true)
      this.removeUnlockListeners = null
    }

    const onUnlock = (event: Event) => {
      if (isLocaleSwitcherTarget(event.target)) return
      if (this.userPaused) return
      if (this.unlocked && !this.pendingUnmute) return

      void this.startPlayback(true).then((ok) => {
        if (ok) removeUnlockListeners()
      })
    }

    this.removeUnlockListeners = removeUnlockListeners

    const tryAutoplay = async () => {
      const ok = await this.startPlayback(false)
      if (!ok || this.pendingUnmute) {
        window.addEventListener('pointerdown', onUnlock, { passive: true })
        window.addEventListener('touchstart', onUnlock, { passive: true })
        window.addEventListener('keydown', onUnlock)
        window.addEventListener('scroll', onUnlock, { passive: true, capture: true })
      }
    }

    void tryAutoplay()

    const audio = this.getAudio()
    if (!audio) return

    const onCanPlay = () => {
      if (!this.unlocked && !this.userPaused) {
        void this.startPlayback(false)
      }
    }

    audio.addEventListener('canplaythrough', onCanPlay)

    const onVisibility = () => {
      if (!audio || this.userPaused || !this.unlocked) return

      if (document.hidden) {
        audio.pause()
        this.playing = false
        this.notify()
        return
      }

      void audio
        .play()
        .then(() => {
          this.playing = true
          this.notify()
        })
        .catch(() => {
          this.playing = false
          this.notify()
        })
    }

    document.addEventListener('visibilitychange', onVisibility)

    window.addEventListener('pagehide', () => {
      audio.pause()
    })
  }
}

export const ambientAudio = new AmbientAudioController()
