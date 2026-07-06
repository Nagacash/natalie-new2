'use client'
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ height: window.innerHeight, width: window.innerWidth });
    };

    // Set initial dimensions
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const menu = {
    open: {
      width: dimensions.width < 768 ? "100vw" : 480,
      height: dimensions.width < 768 ? "100vh" : 650,
      top: dimensions.width < 768 ? "0" : "-25px",
      right: dimensions.width < 768 ? "0" : "-25px",
      transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      width: 100,
      height: 40,
      top: "0px",
      right: "0px",
      transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },
  };

  const initialPath = `M100 0 L100 ${dimensions.height} Q-100 ${dimensions.height / 2} 100 0`;
  const targetPath = `M100 0 L100 ${dimensions.height} Q100 ${dimensions.height / 2} 100 0`;

  const curve = {
    open: {
      d: targetPath,
      transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      d: initialPath,
      transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] },
    },
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="menu"
      variants={menu}
      animate={isOpen ? "open" : "closed"}
      initial="closed"
    >
      <motion.svg className="svgCurve">
        <motion.path
          variants={curve}
          animate={isOpen ? "open" : "closed"}
          initial="closed"
        ></motion.path>
      </motion.svg>

      <div className="body">
        <div className="nav">
          <div className="header">
            <p>Navigation</p>
          </div>
          {children}
        </div>
        <div className="footer">
          <a>Awwwards</a>
          <a>Instagram</a>
          <a>Dribble</a>
          <a>LinkedIn</a>
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;
