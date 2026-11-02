import React, { useState, useRef, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { useApp } from '../../context/AppContext';
import {
  BUILDING_FLOORS,
  PRODUCTS_CATALOG,
  processSmartConversation,
  createOrder
} from '../../services/smartBuildingAi';
import { CLUB_FACILITIES } from './BccChatbotLegacyData';

// Architectural Zones for all 10 Floors (2D Blueprint Schematics)
const FLOOR_BLUEPRINTS = {
  1: {
    title: 'Floor 1: Reception, Turnstiles & Lobby',
    zones: [
      { id: 'lobby', name: 'Main Lobby & Turnstiles', icon: '🛎️', x: 20, y: 20, w: 220, h: 90 },
      { id: 'concierge', name: 'Concierge & Info Desk', icon: 'ℹ️', x: 260, y: 20, w: 220, h: 90 },
      { id: 'security', name: 'Security & RFID Registration', icon: '🛡️', x: 20, y: 130, w: 220, h: 85 },
      { id: 'lounge', name: 'Guest Waiting Lounge', icon: '🛋️', x: 260, y: 130, w: 220, h: 85 }
    ],
    routePath: 'M 250 235 L 250 125 L 370 125 L 370 70'
  },
  2: {
    title: 'Floor 2: Restaurant & Multi-Cuisine Food Court',
    zones: [
      { id: 'silk', name: 'Silk Route Chinese Dining', icon: '🥢', x: 20, y: 20, w: 220, h: 90 },
      { id: 'burger', name: 'Burger & Food Court Counter', icon: '🍔', x: 260, y: 20, w: 220, h: 90 },
      { id: 'kitchen', name: 'Central Kitchen & Wok Hub', icon: '🍳', x: 20, y: 130, w: 220, h: 85 },
      { id: 'vip', name: 'Private VIP Dining Suites', icon: '🍷', x: 260, y: 130, w: 220, h: 85 }
    ],
    routePath: 'M 250 235 L 250 125 L 130 125 L 130 70'
  },
  3: {
    title: 'Floor 3: Tea Garden Café & Coffee Shop',
    zones: [
      { id: 'brew', name: 'Artisan Espresso & Brew Bar', icon: '☕', x: 20, y: 20, w: 220, h: 90 },
      { id: 'bakery', name: 'Bakery & Dessert Showcase', icon: '🍰', x: 260, y: 20, w: 220, h: 90 },
      { id: 'garden', name: 'Indoor Garden Seating', icon: '🌿', x: 20, y: 130, w: 220, h: 85 },
      { id: 'wifi', name: 'High-Speed Wi-Fi Work Zone', icon: '💻', x: 260, y: 130, w: 220, h: 85 }
    ],
    routePath: 'M 250 235 L 250 125 L 130 125 L 130 70'
  },
  4: {
    title: 'Floor 4: Mobile & Electronics Shop',
    zones: [
      { id: 'phones', name: 'Smartphones & Tablets Hub', icon: '📱', x: 20, y: 20, w: 220, h: 90 },
      { id: 'audio', name: 'Wireless Audio & Wearables', icon: '🎧', x: 260, y: 20, w: 220, h: 90 },
      { id: 'power', name: 'Fast Chargers & MagSafe Wall', icon: '🔋', x: 20, y: 130, w: 220, h: 85 },
      { id: 'repair', name: 'Express Device Tech Care', icon: '🔧', x: 260, y: 130, w: 220, h: 85 }
    ],
    routePath: 'M 250 235 L 250 125 L 370 125 L 370 70'
  },
  5: {
    title: 'Floor 5: Fashion & Clothing Store',
    zones: [
      { id: 'blazers', name: 'Bespoke Blazers & Suits', icon: '🧥', x: 20, y: 20, w: 220, h: 90 },
      { id: 'silk', name: 'Mulberry Silk & Panjabi', icon: '🧣', x: 260, y: 20, w: 220, h: 90 },
      { id: 'leather', name: 'Handcrafted Leather Goods', icon: '👛', x: 20, y: 130, w: 220, h: 85 },
      { id: 'fitting', name: 'VIP Fitting & Tailoring Suites', icon: '🪞', x: 260, y: 130, w: 220, h: 85 }
    ],
    routePath: 'M 250 235 L 250 125 L 130 125 L 130 70'
  },
  6: {
    title: 'Floor 6: Corporate Offices & Boardrooms',
    zones: [
      { id: 'boardroom', name: 'Grand Boardroom (24 seats)', icon: '🏛️', x: 20, y: 20, w: 220, h: 90 },
      { id: 'vc', name: 'HD Video Conference Studio', icon: '📹', x: 260, y: 20, w: 220, h: 90 },
      { id: 'suites', name: 'Corporate Meeting Suites', icon: '💼', x: 20, y: 130, w: 220, h: 85 },
      { id: 'print', name: 'Business Hub & Secretarial Desk', icon: '🖨️', x: 260, y: 130, w: 220, h: 85 }
    ],
    routePath: 'M 250 235 L 250 125 L 130 125 L 130 70'
  },
  7: {
    title: 'Floor 7: Shopping & Lifestyle Mart',
    zones: [
      { id: 'tea', name: 'Heritage Tea Boutique', icon: '🫖', x: 20, y: 20, w: 220, h: 90 },
      { id: 'honey', name: 'Sundarbans Wild Honey Corner', icon: '🍯', x: 260, y: 20, w: 220, h: 90 },
      { id: 'souvenirs', name: 'Bilateral Souvenirs & Gifts', icon: '🎁', x: 20, y: 130, w: 220, h: 85 },
      { id: 'cosmetics', name: 'Cosmetics & Fragrance Bar', icon: '✨', x: 260, y: 130, w: 220, h: 85 }
    ],
    routePath: 'M 250 235 L 250 125 L 370 125 L 370 70'
  },
  8: {
    title: 'Floor 8: Gym & Fitness Center',
    zones: [
      { id: 'cardio', name: 'Cardio Deck & Treadmills', icon: '🏃', x: 20, y: 20, w: 220, h: 90 },
      { id: 'weights', name: 'Free Weights & CrossFit Rack', icon: '🏋️', x: 260, y: 20, w: 220, h: 90 },
      { id: 'yoga', name: 'Yoga & Tai Chi Bamboo Studio', icon: '🧘', x: 20, y: 130, w: 220, h: 85 },
      { id: 'tt', name: 'Table Tennis Tournament Arena', icon: '🏓', x: 260, y: 130, w: 220, h: 85 }
    ],
    routePath: 'M 250 235 L 250 125 L 370 125 L 370 70'
  },
  9: {
    title: 'Floor 9: Swimming Pool & Wellness Spa',
    zones: [
      { id: 'pool', name: 'Olympic Heated Swimming Pool', icon: '🏊', x: 20, y: 20, w: 220, h: 90 },
      { id: 'jacuzzi', name: 'Hydrotherapy Jacuzzi & Whirlpool', icon: '♨️', x: 260, y: 20, w: 220, h: 90 },
      { id: 'sauna', name: 'Finnish Sauna & Steam Spa', icon: '🧖', x: 20, y: 130, w: 220, h: 85 },
      { id: 'squash', name: 'Regulation Glass Squash Courts', icon: '🏸', x: 260, y: 130, w: 220, h: 85 }
    ],
    routePath: 'M 250 235 L 250 125 L 130 125 L 130 70'
  },
  10: {
    title: 'Floor 10: Premium Lounge & Lantern Bar',
    zones: [
      { id: 'bar', name: 'Lantern Rooftop Bar', icon: '🍸', x: 20, y: 20, w: 220, h: 90 },
      { id: 'terrace', name: 'Panoramic Riverfront Terrace', icon: '🌌', x: 260, y: 20, w: 220, h: 90 },
      { id: 'banquet', name: 'Grand Gala Banquet Hall (300 seats)', icon: '🏛️', x: 20, y: 130, w: 220, h: 85 },
      { id: 'bbq', name: 'Open-Flame BBQ & Live Grill', icon: '🥩', x: 260, y: 130, w: 220, h: 85 }
    ],
    routePath: 'M 250 235 L 250 125 L 130 125 L 130 70'
  }
};

export default function BccChatbot() {
  const {
    isChatOpen,
    setIsChatOpen,
    chatInitialQuery,
    setChatInitialQuery,
    showToast,
    addTxn
  } = useApp();

  // Internal open state synced with context
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isChatOpen || internalOpen;

  const [inputVal, setInputVal] = useState('');
  const [activeFloor, setActiveFloor] = useState(1);
  const [elevatorFloorDisplay, setElevatorFloorDisplay] = useState(1);
  const [isElevatorMoving, setIsElevatorMoving] = useState(false);
  const [rightPanelTab, setRightPanelTab] = useState('tower'); // 'tower' | 'blueprint'
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState({});

  // GSAP animation refs
  const elevatorCabinRef = useRef(null);
  const towerContainerRef = useRef(null);
  const activeFloorCardRef = useRef(null);
  const detailCardRef = useRef(null);
  const routePathRef = useRef(null);
  const currentElevatorFloorRef = useRef(1);

  // Initial Welcome Message
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      type: 'greeting',
      time: 'Just now',
      text: 'Hello! I am Club AI. I can help you find rooms, restaurants, facilities, and order food across all 10 floors. What are you looking for today?',
      suggestions: [
        'Where is the gym?',
        'I want 2 burgers',
        'Show me coffee',
        'What about swimming?',
        'Do you have an iPhone?',
        'Explore All Floors'
      ]
    }
  ]);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Sync initial query if triggered externally
  useEffect(() => {
    if (chatInitialQuery) {
      handleUserSubmit(chatInitialQuery);
      setChatInitialQuery(null);
    }
  }, [chatInitialQuery]);

  // Auto-scroll chat stream
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // ==========================================================================
  // GSAP 1: Stagger entrance animation when Tower view opens or tab changes
  // ==========================================================================
  useEffect(() => {
    if (isOpen && rightPanelTab === 'tower') {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.tower-floor-card',
          { x: 35, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.035,
            ease: 'power2.out'
          }
        );
      }, towerContainerRef);
      return () => ctx.revert();
    }
  }, [isOpen, rightPanelTab]);

  // ==========================================================================
  // GSAP 2: Smooth Hydraulic Elevator Cabin Motion (Floors 10 down to 1)
  // Each floor slot = 44px height. Floor 10 = Y:0, Floor 1 = Y:396
  // ==========================================================================
  useEffect(() => {
    if (!elevatorCabinRef.current) return;

    const startFloor = currentElevatorFloorRef.current;
    const targetFloor = activeFloor;

    if (startFloor !== targetFloor) {
      setIsElevatorMoving(true);

      const targetY = (10 - targetFloor) * 44;
      const duration = Math.min(1.2, Math.max(0.6, Math.abs(targetFloor - startFloor) * 0.12));

      const tween = gsap.to(elevatorCabinRef.current, {
        y: targetY,
        duration: duration,
        ease: 'power2.inOut',
        onUpdate: () => {
          const p = tween.progress();
          const curr = Math.round(startFloor + (targetFloor - startFloor) * p);
          setElevatorFloorDisplay(curr);
        },
        onComplete: () => {
          currentElevatorFloorRef.current = targetFloor;
          setElevatorFloorDisplay(targetFloor);
          setIsElevatorMoving(false);

          // Pulse destination floor card on arrival
          if (activeFloorCardRef.current) {
            gsap.fromTo(
              activeFloorCardRef.current,
              { scale: 0.98, borderColor: '#10b981' },
              { scale: 1.02, borderColor: '#0b6e52', duration: 0.35, yoyo: true, repeat: 1, ease: 'sine.inOut' }
            );
          }
        }
      });

      return () => tween.kill();
    }
  }, [activeFloor]);

  // ==========================================================================
  // GSAP 3: Detail Card Pop & Fade Animation on Floor Selection
  // ==========================================================================
  useEffect(() => {
    if (detailCardRef.current) {
      gsap.fromTo(
        detailCardRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.38, ease: 'back.out(1.4)' }
      );
    }
  }, [activeFloor]);

  // ==========================================================================
  // GSAP 4: Flowing Animated Route Path in 2D Blueprint (Marching Ants)
  // ==========================================================================
  useEffect(() => {
    if (rightPanelTab === 'blueprint' && routePathRef.current) {
      const tween = gsap.to(routePathRef.current, {
        strokeDashoffset: -40,
        duration: 1.2,
        repeat: -1,
        ease: 'none'
      });
      return () => tween.kill();
    }
  }, [rightPanelTab, activeFloor]);

  // Voice Speech Recognition Setup (Web Speech API)
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognizer = new SpeechRecognition();
      recognizer.continuous = false;
      recognizer.interimResults = false;
      recognizer.lang = 'en-US';

      recognizer.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputVal(transcript);
        setIsListening(false);
        handleUserSubmit(transcript);
      };

      recognizer.onerror = () => {
        setIsListening(false);
        showToast('Voice input ended. You can type your request.');
      };

      recognizer.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognizer;
    }
  }, []);

  const toggleVoice = () => {
    if (!recognitionRef.current) {
      showToast('Voice recognition is not supported in this browser. Please type.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        showToast('Listening... Speak now (English or Bangla)');
      } catch (e) {
        setIsListening(false);
      }
    }
  };

  const handleClose = () => {
    setInternalOpen(false);
    setIsChatOpen(false);
  };

  const handleOpen = () => {
    setInternalOpen(true);
    setIsChatOpen(true);
  };

  const handleNewConversation = () => {
    setConversationContext({});
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        type: 'greeting',
        time: 'Just now',
        text: 'Hello! Conversation reset. I can guide you across all 10 floors, search products, or place food orders. What are you looking for today?',
        suggestions: [
          'Where is the gym?',
          'I want 2 burgers',
          'Show me coffee',
          'What about swimming?',
          'Explore All Floors'
        ]
      }
    ]);
    setActiveFloor(1);
    showToast('Started a new conversation');
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard!');
  };

  // Main Submit Handler
  const handleUserSubmit = (queryText) => {
    if (!queryText || !queryText.trim()) return;

    const userQuery = queryText.trim();
    setInputVal('');

    // Append user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: userQuery
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Simulate AI thinking and streaming response
    setTimeout(() => {
      const result = processSmartConversation({
        text: userQuery,
        context: conversationContext,
        activeFloor
      });

      if (result) {
        if (result.targetFloor && result.targetFloor !== activeFloor) {
          setActiveFloor(result.targetFloor);
        }

        if (result.context) {
          setConversationContext(result.context);
        }

        const botMsg = {
          id: Date.now() + 1,
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: result.reply,
          type: result.type,
          targetFloor: result.targetFloor,
          products: result.products,
          product: result.product,
          pendingOrder: result.pendingOrder,
          order: result.order,
          alternatives: result.alternatives,
          suggestions: result.suggestions
        };

        setMessages((prev) => [...prev, botMsg]);
      } else {
        // Fallback
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            sender: 'bot',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: "I couldn't find that. Try asking for a floor, facility (Gym, Pool, Café), or product (Burger, Coffee).",
            type: 'text',
            suggestions: ['Where is the gym?', 'I want a burger', 'Explore All Floors']
          }
        ]);
      }

      setIsTyping(false);
    }, 400);
  };

  // Confirm Order action
  const handleConfirmOrder = (pendingOrder) => {
    try {
      const order = createOrder({
        product: pendingOrder.product,
        quantity: pendingOrder.quantity
      });

      // Record transaction into AppContext
      if (addTxn) {
        addTxn({
          outlet: pendingOrder.product.business,
          method: 'Member account',
          amount: order.total,
          st: 'Success'
        });
      }

      setConversationContext((prev) => ({
        ...prev,
        pendingOrder: null,
        lastOrder: order
      }));

      const botMsg = {
        id: Date.now(),
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `🎉 **Order Confirmed!** Your order **#${order.orderId}** has been placed.\n\n📍 **Pickup:** ${order.pickupLocation}\n⏱️ **Prep Time:** ~15 minutes\n💵 **Total Paid:** ৳${order.total}`,
        type: 'order_success',
        order,
        targetFloor: order.floor,
        suggestions: ['Track my order', 'Where is the gym?', 'Explore All Floors']
      };

      setMessages((prev) => [...prev, botMsg]);
      showToast(`Order #${order.orderId} placed successfully!`);
    } catch (err) {
      showToast(`Order failed: ${err.message}`);
    }
  };

  // Cancel Order proposal
  const handleCancelProposal = () => {
    setConversationContext((prev) => ({ ...prev, pendingOrder: null }));
    const botMsg = {
      id: Date.now(),
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: '❌ Order cancelled. What else can I assist you with across our 10 floors?',
      type: 'text',
      suggestions: ['Where is the gym?', 'Show me coffee', 'Explore All Floors']
    };
    setMessages((prev) => [...prev, botMsg]);
  };

  // Click on a product card to order
  const handleSelectProduct = (prod) => {
    handleUserSubmit(`I want to order ${prod.name}`);
  };

  // Click on floor in building visualization
  const handleFloorClick = (flNum) => {
    setActiveFloor(flNum);
    const fl = BUILDING_FLOORS.find((f) => f.floor === flNum);
    if (fl) {
      handleUserSubmit(`Tell me about Floor ${flNum} (${fl.name})`);
    }
  };

  // Current active floor object
  const currentFloorData = useMemo(() => {
    return BUILDING_FLOORS.find((f) => f.floor === activeFloor) || BUILDING_FLOORS[0];
  }, [activeFloor]);

  // Current 2D blueprint object
  const currentBlueprint = useMemo(() => {
    return FLOOR_BLUEPRINTS[activeFloor] || FLOOR_BLUEPRINTS[1];
  }, [activeFloor]);

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={handleOpen}
          aria-label="Open Club AI"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#0b6e52] hover:bg-[#095942] text-white shadow-xl hover:shadow-2xl border border-[#e8b04a]/60 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
        >
          <div className="w-7 h-7 rounded-full bg-[#e0412f] flex items-center justify-center text-white text-sm shadow-inner flex-shrink-0 animate-pulse">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-white stroke-2">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
          </div>
          <div className="text-left font-serif leading-none pr-1">
            <div className="text-xs font-bold text-white tracking-wide flex items-center gap-1.5">
              <span>Club AI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
            </div>
            <div className="text-[10px] text-[#e8b04a] font-sans mt-0.5">
              ১০-তলা ম্যাপ ও এআই
            </div>
          </div>
        </button>
      )}

      {/* Main Modal Interface */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
          <div
            className={`w-full bg-[#f4f7f5] text-[#10231c] rounded-3xl shadow-2xl border border-white/60 overflow-hidden flex flex-col transition-all duration-300 ${
              isFullscreen
                ? 'fixed inset-2 w-[calc(100vw-16px)] h-[calc(100vh-16px)] rounded-2xl'
                : 'max-w-6xl h-[92vh] max-h-[850px]'
            }`}
          >
            {/* Modal Top Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 bg-white border-b border-[#e2e8e3] select-none flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0b6e52] to-[#128a67] flex items-center justify-center text-white shadow-md flex-shrink-0">
                    <span className="text-base">🏢</span>
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#10231c] leading-tight flex items-center gap-2">
                    <span>Club AI</span>
                    <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      ১০-তলা এআই
                    </span>
                  </h3>
                  <p className="text-[11px] text-[#5b7367]">
                    স্মার্ট ফ্লোর ম্যাপ ও ক্লাব কনসিয়ার্জ
                  </p>
                </div>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center gap-2">
                {/* View Switcher: Tower vs Blueprint */}
                <div className="hidden sm:flex items-center bg-[#e8efe9] p-0.5 rounded-xl border border-[#d5dfd8]">
                  <button
                    type="button"
                    onClick={() => setRightPanelTab('tower')}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                      rightPanelTab === 'tower'
                        ? 'bg-white text-[#0b6e52] shadow-xs font-semibold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    🏢 10-Floor Tower
                  </button>
                  <button
                    type="button"
                    onClick={() => setRightPanelTab('blueprint')}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                      rightPanelTab === 'blueprint'
                        ? 'bg-white text-[#0b6e52] shadow-xs font-semibold'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    🗺️ 2D Floor Map
                  </button>
                </div>

                {/* New Conversation Button */}
                <button
                  type="button"
                  onClick={handleNewConversation}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center gap-1"
                  title="Start New Conversation"
                >
                  <span>🔄</span>
                  <span className="hidden md:inline">New Chat</span>
                </button>

                {/* Fullscreen Toggle */}
                <button
                  type="button"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                  title={isFullscreen ? 'Restore window' : 'Full screen'}
                >
                  <svg className="w-4 h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                    {isFullscreen ? (
                      <path d="M4 14h6m0 0v6m0-6L3 21m17-7h-6m0 0v6m0-6l7 7M14 4h6m0 0v6m0-6L21 3M4 10h6m0 0V4m0 6L3 3" />
                    ) : (
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    )}
                  </svg>
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200 transition-colors"
                  title="Close Club AI"
                >
                  <svg className="w-4 h-4 stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Split Body Layout */}
            <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
              {/* LEFT COLUMN: Modern ChatGPT-Style AI Conversation Stream */}
              <div className="w-full lg:w-[54%] flex flex-col h-full bg-[#f8faf8] border-r border-[#dbe4de]">
                {/* Scrollable Messages Container */}
                <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-5 space-y-4">
                  {messages.map((m) => (
                    <div key={m.id} className="animate-in fade-in duration-200">
                      {/* USER MESSAGE */}
                      {m.sender === 'user' && (
                        <div className="flex justify-end my-1.5">
                          <div className="bg-[#0b6e52] text-white px-4 py-2.5 rounded-2xl rounded-br-xs text-sm font-medium shadow-sm max-w-[85%]">
                            <p className="whitespace-pre-wrap">{m.text}</p>
                            <span className="block text-[10px] text-emerald-200/80 text-right mt-1">
                              {m.time}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* AI BOT MESSAGE */}
                      {m.sender === 'bot' && (
                        <div className="flex items-start gap-3 my-2 max-w-[96%]">
                          {/* AI Avatar */}
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0b6e52] to-[#149e76] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm mt-0.5">
                            AI
                          </div>

                          <div className="flex-1 space-y-2.5 min-w-0">
                            {/* Main Message Bubble */}
                            <div className="bg-white border border-[#e1e7e2] text-[#10231c] px-4 py-3 rounded-2xl rounded-tl-xs text-sm leading-relaxed shadow-sm relative group">
                              <div className="whitespace-pre-wrap">
                                {m.text.split('\n').map((line, idx) => {
                                  if (line.startsWith('•') || line.startsWith('-')) {
                                    return (
                                      <div key={idx} className="flex items-start gap-1.5 my-0.5">
                                        <span className="text-emerald-600 font-bold">•</span>
                                        <span>{line.replace(/^[•-]\s*/, '')}</span>
                                      </div>
                                    );
                                  }
                                  return (
                                    <p key={idx} className="my-0.5">
                                      {line}
                                    </p>
                                  );
                                })}
                              </div>

                              <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-gray-100 text-[10px] text-gray-400">
                                <span>{m.time}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(m.text)}
                                  className="hover:text-emerald-700 transition-colors flex items-center gap-1"
                                >
                                  <span>📋</span> Copy
                                </button>
                              </div>
                            </div>

                            {/* ORDER PROPOSAL CARD */}
                            {m.pendingOrder && (
                              <div className="bg-white border-2 border-amber-400/80 rounded-2xl p-4 shadow-md space-y-3 animate-in slide-in-from-bottom-2 duration-300">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                  <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                                    <span>🛒</span> Order Confirmation
                                  </span>
                                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                                    Floor {m.pendingOrder.product.floor}
                                  </span>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    <span className="text-2xl">{m.pendingOrder.product.image}</span>
                                    <div>
                                      <h4 className="font-bold text-gray-900">
                                        {m.pendingOrder.product.name}
                                      </h4>
                                      <p className="text-xs text-gray-500">
                                        ৳{m.pendingOrder.product.price} × {m.pendingOrder.quantity}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-xs text-gray-500 block">Total</span>
                                    <span className="font-bold text-base text-emerald-700">
                                      ৳{m.pendingOrder.total}
                                    </span>
                                  </div>
                                </div>

                                <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg flex items-center justify-between">
                                  <span>📍 Location:</span>
                                  <span className="font-semibold text-gray-800">
                                    {m.pendingOrder.location}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 pt-1">
                                  <button
                                    type="button"
                                    onClick={() => handleConfirmOrder(m.pendingOrder)}
                                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-sm transition-all"
                                  >
                                    ✓ Confirm Order (৳{m.pendingOrder.total})
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleCancelProposal}
                                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-all"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            )}

                            {/* ORDER SUCCESS SUMMARY CARD */}
                            {m.order && (
                              <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 shadow-sm space-y-2.5 animate-in slide-in-from-bottom-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                                    <span className="text-base">✅</span> Order Placed Successfully
                                  </span>
                                  <span className="font-mono text-xs font-bold text-emerald-900 bg-emerald-200 px-2 py-0.5 rounded-full">
                                    {m.order.orderId}
                                  </span>
                                </div>
                                <div className="text-xs text-emerald-900 space-y-1">
                                  <p>
                                    <strong>Item:</strong> {m.order.product.name} × {m.order.quantity}
                                  </p>
                                  <p>
                                    <strong>Pickup Floor:</strong> Floor {m.order.floor} ({m.order.product.business})
                                  </p>
                                  <p>
                                    <strong>Total Amount:</strong> ৳{m.order.total} (Billed to Member Account)
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* PRODUCT LIST GRID / CAROUSEL */}
                            {m.products && m.products.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                                {m.products.map((prod) => (
                                  <div
                                    key={prod.id}
                                    className="bg-white border border-[#dce5df] hover:border-[#0b6e52] rounded-xl p-3 shadow-xs transition-all flex flex-col justify-between"
                                  >
                                    <div>
                                      <div className="flex items-start justify-between gap-1">
                                        <span className="text-2xl">{prod.image}</span>
                                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                          Floor {prod.floor}
                                        </span>
                                      </div>
                                      <h5 className="font-bold text-xs text-gray-900 mt-1 leading-snug">
                                        {prod.name}
                                      </h5>
                                      <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">
                                        {prod.desc}
                                      </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                                      <span className="font-bold text-sm text-emerald-700">
                                        ৳{prod.price}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => handleSelectProduct(prod)}
                                        className="px-2.5 py-1 rounded-lg bg-[#0b6e52] hover:bg-[#08523d] text-white text-[11px] font-semibold transition-colors"
                                      >
                                        + Order
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* OUT OF STOCK & ALTERNATIVES CARD */}
                            {m.alternatives && m.alternatives.length > 0 && (
                              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-2">
                                <span className="text-xs font-semibold text-amber-800 block">
                                  💡 In-Stock Recommended Alternatives:
                                </span>
                                <div className="space-y-1.5">
                                  {m.alternatives.map((alt) => (
                                    <div
                                      key={alt.id}
                                      className="flex items-center justify-between bg-white p-2 rounded-lg border border-amber-200/60 text-xs"
                                    >
                                      <div>
                                        <span className="font-bold text-gray-800">{alt.name}</span>
                                        <span className="text-[11px] text-gray-500 block">
                                          Floor {alt.floor} · ৳{alt.price}
                                        </span>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => handleSelectProduct(alt)}
                                        className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[11px]"
                                      >
                                        Order
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* CONTEXTUAL QUICK SUGGESTIONS CHIPS */}
                            {m.suggestions && m.suggestions.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {m.suggestions.map((chip, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => handleUserSubmit(chip)}
                                    className="px-3 py-1 rounded-full bg-white border border-[#d5ded7] hover:border-[#0b6e52] hover:bg-[#edf4f0] text-xs font-medium text-[#21382d] transition-colors shadow-2xs"
                                  >
                                    {chip}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* TYPING INDICATOR ANIMATION */}
                  {isTyping && (
                    <div className="flex items-center gap-3 my-2 animate-in fade-in">
                      <div className="w-8 h-8 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                        AI
                      </div>
                      <div className="bg-white border border-[#e1e7e2] px-4 py-2.5 rounded-2xl rounded-tl-xs shadow-xs flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                        <span className="text-xs text-gray-500 ml-1.5 font-medium">Thinking...</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Bottom Input Capsule Bar */}
                <div className="p-3.5 sm:p-4 bg-white border-t border-[#e2e8e3] flex-shrink-0">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUserSubmit(inputVal);
                    }}
                    className="flex items-center gap-2"
                  >
                    {/* Voice Mic Button */}
                    <button
                      type="button"
                      onClick={toggleVoice}
                      className={`p-2.5 rounded-full transition-all flex items-center justify-center flex-shrink-0 ${
                        isListening
                          ? 'bg-red-500 text-white animate-pulse shadow-md ring-4 ring-red-200'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                      title={isListening ? 'Listening... click to stop' : 'Voice input (Bangla/English)'}
                    >
                      <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                        <path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4m-4 0h8" />
                      </svg>
                    </button>

                    {/* Chat Text Input */}
                    <input
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      placeholder="Ask where is gym, order 2 burgers, find coffee..."
                      className="flex-1 bg-[#f8faf8] border border-[#ced7d1] rounded-full px-4 sm:px-5 py-2.5 text-sm text-[#10231c] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b6e52] focus:border-transparent transition-all"
                    />

                    {/* Send Button */}
                    <button
                      type="submit"
                      disabled={!inputVal.trim()}
                      className="px-5 py-2.5 rounded-full bg-[#0b6e52] hover:bg-[#085942] disabled:opacity-40 text-white font-semibold text-sm shadow-sm transition-colors flex-shrink-0"
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>

              {/* RIGHT COLUMN: GSAP-ANIMATED 10-FLOOR BUILDING VISUALIZATION & 2D BLUEPRINT */}
              <div className="w-full lg:w-[46%] flex flex-col h-full bg-[#f4f7f4] p-4 sm:p-5 overflow-y-auto">
                {rightPanelTab === 'tower' ? (
                  /* ========================================================== */
                  /* GSAP-ANIMATED 10-FLOOR TOWER WITH ELEVATOR SHAFT           */
                  /* ========================================================== */
                  <div className="space-y-3.5">
                    {/* Header & Live Elevator Telemetry */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-base sm:text-lg text-[#10231c] tracking-tight flex items-center gap-2">
                          <span>10-Floor Smart Building</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-sans font-semibold">
                            GSAP Real-Time
                          </span>
                        </h4>
                        <p className="text-[11px] text-[#5e7568]">
                          Hydraulic elevator shaft & synchronized floor tracking
                        </p>
                      </div>

                      {/* Elevator Telemetry Badge */}
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#d5dfd8] text-xs font-mono shadow-xs">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isElevatorMoving ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'
                          }`}
                        />
                        <span className="font-bold text-emerald-900">
                          🛗 Lift: Fl {elevatorFloorDisplay}
                        </span>
                      </div>
                    </div>

                    {/* 10-Floor Stack Container with Dedicated Elevator Shaft */}
                    <div
                      ref={towerContainerRef}
                      className="bg-[#e9f0ea] border-2 border-[#d5ded7] rounded-2xl p-3 shadow-inner relative select-none"
                    >
                      {/* Rooftop Heading */}
                      <div className="text-center pb-2 flex items-center justify-center gap-2">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-[#476356]">
                          ▲ Rooftop Terrace & Skyline Garden ▲
                        </span>
                      </div>

                      {/* Main Dual Grid: [Elevator Shaft Column] + [10 Floors Stack] */}
                      <div className="relative flex gap-2.5">
                        {/* 1. ELEVATOR SHAFT (Left vertical column, height 440px) */}
                        <div className="w-10 relative bg-[#d6e2d8] rounded-xl border border-[#b8cbbe] overflow-hidden flex-shrink-0 flex justify-center">
                          {/* Vertical Cable Tracks */}
                          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gray-400/60" />
                          <div className="absolute top-0 bottom-0 left-2 w-[1px] bg-gray-400/30" />
                          <div className="absolute top-0 bottom-0 right-2 w-[1px] bg-gray-400/30" />

                          {/* GSAP-Driven Elevator Cabin (Translates smoothly along Y axis) */}
                          <div
                            ref={elevatorCabinRef}
                            style={{ transform: `translateY(${(10 - elevatorFloorDisplay) * 44}px)` }}
                            className="absolute top-0 w-8 h-[40px] rounded-lg bg-gradient-to-b from-[#0b6e52] to-[#043d2c] border border-emerald-400 shadow-md flex flex-col items-center justify-center text-white z-20 transition-shadow duration-300"
                          >
                            <span className="text-[9px] font-mono font-bold tracking-tighter text-emerald-200 leading-none">
                              F{elevatorFloorDisplay}
                            </span>
                            <div className="w-4 h-[2px] bg-emerald-300 rounded-full my-0.5" />
                            <div className="flex gap-0.5">
                              <span className="w-1 h-3 bg-black/40 rounded-xs" />
                              <span className="w-1 h-3 bg-black/40 rounded-xs" />
                            </div>
                          </div>
                        </div>

                        {/* 2. 10 FLOORS STACK (Right column: Floors 10 down to 1) */}
                        <div className="flex-1 space-y-1">
                          {[...BUILDING_FLOORS].reverse().map((fl) => {
                            const isSelected = activeFloor === fl.floor;
                            const isElevatorArrived = elevatorFloorDisplay === fl.floor;

                            return (
                              <div
                                key={fl.floor}
                                ref={isSelected ? activeFloorCardRef : null}
                                onClick={() => handleFloorClick(fl.floor)}
                                className={`tower-floor-card flex items-center justify-between px-3 h-[40px] rounded-xl transition-all duration-300 cursor-pointer border ${
                                  isSelected
                                    ? 'bg-white border-2 border-[#0b6e52] shadow-md ring-2 ring-[#0b6e52]/20 scale-[1.015]'
                                    : 'bg-white/75 border-white/80 hover:bg-white hover:border-[#cedcd2] shadow-2xs'
                                }`}
                              >
                                <div className="flex items-center gap-2 min-w-0">
                                  {/* Floor Badge */}
                                  <span
                                    className={`w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold font-mono flex-shrink-0 transition-colors ${
                                      isSelected
                                        ? 'bg-[#0b6e52] text-white'
                                        : 'bg-gray-100 text-gray-700'
                                    }`}
                                  >
                                    {fl.floor}
                                  </span>

                                  {/* Facility Icon & Name */}
                                  <span className="text-sm flex-shrink-0">{fl.icon}</span>
                                  <div className="min-w-0 truncate">
                                    <span
                                      className={`text-xs block truncate ${
                                        isSelected
                                          ? 'font-bold text-[#0b6e52]'
                                          : 'font-medium text-gray-800'
                                      }`}
                                    >
                                      {fl.name}
                                    </span>
                                  </div>
                                </div>

                                {/* Right Floor Status Indicator */}
                                <div className="flex items-center gap-1.5 flex-shrink-0">
                                  <span className="text-[10px] text-gray-400 font-mono hidden sm:inline">
                                    Ext {fl.ext}
                                  </span>
                                  {isSelected && (
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Selected Floor Detailed Floating Card (GSAP Animated In) */}
                    <div
                      ref={detailCardRef}
                      className="bg-white border border-[#dce5df] rounded-2xl p-4 shadow-sm space-y-2.5"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl">{currentFloorData.icon}</span>
                          <div>
                            <h4 className="font-bold text-sm text-[#10231c]">
                              Floor {currentFloorData.floor}: {currentFloorData.name}
                            </h4>
                            <p className="text-[11px] text-gray-500">
                              {currentFloorData.bnName} · {currentFloorData.category}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {currentFloorData.hours}
                        </span>
                      </div>

                      <p className="text-xs text-gray-600 leading-relaxed">
                        {currentFloorData.desc}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {currentFloorData.facilities.map((fac, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-gray-100 text-gray-700"
                          >
                            ✓ {fac}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => setRightPanelTab('blueprint')}
                          className="flex-1 py-1.5 rounded-lg bg-[#0b6e52] hover:bg-[#095942] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <span>🗺️</span>
                          <span>View 2D Blueprint of Floor {currentFloorData.floor}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast(`Calling Ext. ${currentFloorData.ext} (${currentFloorData.name})...`)}
                          className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-medium transition-colors"
                        >
                          Ext. {currentFloorData.ext}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ========================================================== */
                  /* GSAP-ANIMATED 2D ARCHITECTURAL BLUEPRINT SCHEMATIC         */
                  /* ========================================================== */
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-serif font-bold text-base sm:text-lg text-[#10231c]">
                          {currentBlueprint.title}
                        </h4>
                        <p className="text-[11px] text-[#5e7568]">
                          GSAP Flowing Route from Lift Exit to Floor Zones
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setRightPanelTab('tower')}
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-100 hover:bg-emerald-200 text-[#0b6e52] transition-colors flex items-center gap-1"
                      >
                        <span>🏢</span>
                        <span>Tower View</span>
                      </button>
                    </div>

                    {/* Quick Floor Selector Pills */}
                    <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
                      {BUILDING_FLOORS.map((f) => (
                        <button
                          key={f.floor}
                          type="button"
                          onClick={() => setActiveFloor(f.floor)}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all flex-shrink-0 ${
                            activeFloor === f.floor
                              ? 'bg-[#0b6e52] text-white shadow-xs'
                              : 'bg-white border text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          F{f.floor}
                        </button>
                      ))}
                    </div>

                    {/* SVG 2D Architectural Schematic with GSAP Flowing Dashed Route */}
                    <div className="bg-[#edf2ee] border-2 border-[#d5dfd8] rounded-2xl p-3 shadow-inner relative overflow-hidden select-none">
                      <svg
                        viewBox="0 0 500 240"
                        className="w-full h-auto drop-shadow-sm font-sans"
                        aria-label="Floor blueprint"
                      >
                        {/* Floor Boundary Box */}
                        <rect
                          x="10"
                          y="10"
                          width="480"
                          height="220"
                          rx="14"
                          fill="#f8faf8"
                          stroke="#94a3b8"
                          strokeWidth="2"
                        />

                        {/* Internal Hallway & Corridors */}
                        <line x1="245" y1="15" x2="245" y2="225" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4,4" />
                        <line x1="15" y1="115" x2="485" y2="115" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4,4" />

                        {/* Architectural Rooms for this Floor */}
                        {currentBlueprint.zones.map((zone, idx) => (
                          <g
                            key={zone.id}
                            onClick={() => handleUserSubmit(`Tell me about ${zone.name} on Floor ${activeFloor}`)}
                            className="cursor-pointer group"
                          >
                            <rect
                              x={zone.x}
                              y={zone.y}
                              width={zone.w}
                              height={zone.h}
                              rx="10"
                              fill={idx === 0 ? '#e1f4ec' : '#ffffff'}
                              stroke={idx === 0 ? '#0b6e52' : '#cbd5e1'}
                              strokeWidth={idx === 0 ? '2' : '1.2'}
                              className="transition-colors duration-200 group-hover:stroke-emerald-600"
                            />
                            <text
                              x={zone.x + zone.w / 2}
                              y={zone.y + 40}
                              textAnchor="middle"
                              fontSize="18"
                            >
                              {zone.icon}
                            </text>
                            <text
                              x={zone.x + zone.w / 2}
                              y={zone.y + 65}
                              textAnchor="middle"
                              fontSize="11"
                              fontWeight={idx === 0 ? 'bold' : 'normal'}
                              fill={idx === 0 ? '#0b6e52' : '#1e293b'}
                            >
                              {zone.name}
                            </text>
                          </g>
                        ))}

                        {/* Elevator Exit Red Beacon */}
                        <g transform="translate(250, 230)">
                          <circle cx="0" cy="0" r="5" fill="#dc2626" className="animate-ping opacity-75" />
                          <circle cx="0" cy="0" r="4.5" fill="#dc2626" />
                          <text x="0" y="-8" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0b6e52">
                            🛗 Lift Exit
                          </text>
                        </g>

                        {/* GSAP Flowing Dashed Route Path */}
                        <path
                          ref={routePathRef}
                          d={currentBlueprint.routePath}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3.2"
                          strokeDasharray="8,5"
                          strokeLinecap="round"
                        />
                        <circle cx={currentBlueprint.routePath.split(' ').slice(-2)[0]} cy={currentBlueprint.routePath.split(' ').slice(-1)[0]} r="4" fill="#0b6e52" />
                      </svg>
                    </div>

                    {/* Blueprint Quick Action Notice */}
                    <div className="bg-white border border-[#dce5df] rounded-xl p-3 text-xs text-gray-600 flex items-center justify-between">
                      <span>Click any room on Floor {activeFloor} to explore or order.</span>
                      <button
                        type="button"
                        onClick={() => handleUserSubmit(`What can I buy on Floor ${activeFloor}?`)}
                        className="px-3 py-1 rounded-lg bg-[#0b6e52] hover:bg-[#095942] text-white font-medium text-[11px]"
                      >
                        Explore Floor {activeFloor}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
