'use client'

/**
 * Comprehensive Debugging Utility for Responsive Issues
 * 
 * This utility provides detailed logging and monitoring of responsive behavior
 * to help identify and resolve layout issues across different screen sizes.
 */

// Types for debugging
interface DebugInfo {
  timestamp: number;
  message: string;
  data?: any;
  type: 'INFO' | 'WARN' | 'ERROR' | 'LAYOUT' | 'RESPONSIVE' | 'PERFORMANCE' | 'VERBOSE';
  component?: string;
  screenInfo?: ScreenInfo;
}

interface ScreenInfo {
  width: number;
  height: number;
  breakpoint: string;
  orientation: 'portrait' | 'landscape';
  deviceType: 'mobile' | 'tablet' | 'desktop';
  userAgent: string;
}

interface LayoutInfo {
  sidebarWidth: number;
  contentWidth: number;
  totalWidth: number;
  overflow: boolean;
  elements: ElementInfo[];
}

interface ElementInfo {
  tagName: string;
  className: string;
  id: string;
  width: number;
  height: number;
  position: string;
  computedStyles: CSSStyleDeclaration;
}

// Debug levels
type DebugLevel = 'NONE' | 'ERROR' | 'WARN' | 'INFO' | 'VERBOSE';

// Global debug configuration
let DEBUG_LEVEL: DebugLevel = 'NONE';
let DEBUG_LOGS: DebugInfo[] = [];
let DEBUG_CALLBACK: ((info: DebugInfo) => void) | null = null;

// Initialize debugging
export const initDebugging = (level: DebugLevel = 'INFO', callback?: (info: DebugInfo) => void) => {
  DEBUG_LEVEL = level;
  DEBUG_CALLBACK = callback || null;
  logDebug('DEBUG', 'Debugging initialized', { level }, 'INFO');
};

// Log debug information
export const logDebug = (
  component: string,
  message: string,
  data?: any,
  type: DebugInfo['type'] = 'INFO'
) => {
  if (DEBUG_LEVEL === 'NONE') return;
  
  const debugInfo: DebugInfo = {
    timestamp: Date.now(),
    message,
    data,
    type,
    component,
    screenInfo: getScreenInfo()
  };
  
  DEBUG_LOGS.push(debugInfo);
  
  // Call callback if provided
  if (DEBUG_CALLBACK) {
    DEBUG_CALLBACK(debugInfo);
  }
  
  // Console logging based on level
  switch (type) {
    case 'ERROR':
      if (['ERROR', 'WARN', 'INFO', 'VERBOSE'].includes(DEBUG_LEVEL)) {
        console.error(`[DEBUG][${component}][${type}] ${message}`, data);
      }
      break;
    case 'WARN':
      if (['WARN', 'INFO', 'VERBOSE'].includes(DEBUG_LEVEL)) {
        console.warn(`[DEBUG][${component}][${type}] ${message}`, data);
      }
      break;
    case 'INFO':
      if (['INFO', 'VERBOSE'].includes(DEBUG_LEVEL)) {
        console.info(`[DEBUG][${component}][${type}] ${message}`, data);
      }
      break;
    case 'VERBOSE':
      if (DEBUG_LEVEL === 'VERBOSE') {
        console.debug(`[DEBUG][${component}][${type}] ${message}`, data);
      }
      break;
    default:
      if (['INFO', 'VERBOSE'].includes(DEBUG_LEVEL)) {
        console.log(`[DEBUG][${component}][${type}] ${message}`, data);
      }
  }
};

// Get current screen information
export const getScreenInfo = (): ScreenInfo => {
  if (typeof window === 'undefined') {
    return {
      width: 0,
      height: 0,
      breakpoint: 'unknown',
      orientation: 'portrait',
      deviceType: 'desktop',
      userAgent: 'server-side'
    };
  }
  
  const width = window.innerWidth;
  const height = window.innerHeight;
  const orientation = width > height ? 'landscape' : 'portrait';
  const userAgent = navigator.userAgent;
  
  // Determine breakpoint
  let breakpoint = 'xs';
  if (width >= 1200) breakpoint = 'xl';
  else if (width >= 992) breakpoint = 'lg';
  else if (width >= 768) breakpoint = 'md';
  else if (width >= 576) breakpoint = 'sm';
  
  // Determine device type
  let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
  if (width < 768) deviceType = 'mobile';
  else if (width < 992) deviceType = 'tablet';
  
  return {
    width,
    height,
    breakpoint,
    orientation,
    deviceType,
    userAgent
  };
};

// Check for layout issues
export const checkLayoutIssues = (container: HTMLElement | null): LayoutInfo | null => {
  if (!container || typeof window === 'undefined') return null;
  
  try {
    const rect = container.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(container);
    
    // Check for overflow
    const overflowX = computedStyle.overflowX;
    
    // Get all child elements
    const elements: ElementInfo[] = [];
    const children = container.querySelectorAll('*');
    
    children.forEach((el: Element) => {
      if (el instanceof HTMLElement) {
        const elRect = el.getBoundingClientRect();
        const elStyle = window.getComputedStyle(el);
        
        elements.push({
          tagName: el.tagName,
          className: el.className,
          id: el.id,
          width: elRect.width,
          height: elRect.height,
          position: elStyle.position,
          computedStyles: elStyle
        });
      }
    });
    
    return {
      sidebarWidth: 0, // Will be calculated separately
      contentWidth: rect.width,
      totalWidth: window.innerWidth,
      overflow: overflowX === 'visible' || overflowX === 'auto',
      elements
    };
  } catch (error) {
    logDebug('LAYOUT_CHECKER', 'Error checking layout', error, 'ERROR');
    return null;
  }
};

// Check for responsive breakpoints
export const checkResponsiveBreakpoints = () => {
  if (typeof window === 'undefined') return;
  
  const breakpoints = {
    xs: window.matchMedia('(max-width: 575.98px)').matches,
    sm: window.matchMedia('(min-width: 576px) and (max-width: 767.98px)').matches,
    md: window.matchMedia('(min-width: 768px) and (max-width: 991.98px)').matches,
    lg: window.matchMedia('(min-width: 992px) and (max-width: 1199.98px)').matches,
    xl: window.matchMedia('(min-width: 1200px)').matches
  };
  
  logDebug('RESPONSIVE_CHECKER', 'Current breakpoints', breakpoints, 'RESPONSIVE');
  return breakpoints;
};

// Monitor resize events
export const monitorResize = (callback?: (screenInfo: ScreenInfo) => void) => {
  if (typeof window === 'undefined') return () => {};
  
  const handleResize = () => {
    const screenInfo = getScreenInfo();
    logDebug('RESIZE_MONITOR', 'Window resized', screenInfo, 'INFO');
    
    if (callback) {
      callback(screenInfo);
    }
  };
  
  window.addEventListener('resize', handleResize);
  logDebug('RESIZE_MONITOR', 'Resize monitoring started', {}, 'INFO');
  
  return () => {
    window.removeEventListener('resize', handleResize);
    logDebug('RESIZE_MONITOR', 'Resize monitoring stopped', {}, 'INFO');
  };
};

// Monitor scroll events
export const monitorScroll = (callback?: (scrollInfo: any) => void) => {
  if (typeof window === 'undefined') return () => {};
  
  const handleScroll = () => {
    const scrollInfo = {
      x: window.scrollX,
      y: window.scrollY,
      maxX: document.documentElement.scrollWidth - window.innerWidth,
      maxY: document.documentElement.scrollHeight - window.innerHeight
    };
    
    logDebug('SCROLL_MONITOR', 'Page scrolled', scrollInfo, 'INFO');
    
    if (callback) {
      callback(scrollInfo);
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  logDebug('SCROLL_MONITOR', 'Scroll monitoring started', {}, 'INFO');
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
    logDebug('SCROLL_MONITOR', 'Scroll monitoring stopped', {}, 'INFO');
  };
};

// Check for horizontal overflow
export const checkHorizontalOverflow = (element: HTMLElement | null = null): boolean => {
  if (typeof window === 'undefined') return false;
  
  if (!element) {
    element = document.body;
  }
  
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const computedStyle = window.getComputedStyle(element);
  
  // Check if element overflows horizontally
  const overflowX = computedStyle.overflowX;
  const hasOverflow = overflowX === 'visible' || overflowX === 'auto';
  
  logDebug('OVERFLOW_CHECKER', 'Horizontal overflow check', {
    element: element.tagName,
    width: rect.width,
    windowWidth: window.innerWidth,
    overflowX,
    hasOverflow
  }, 'LAYOUT');
  
  return hasOverflow && rect.width > window.innerWidth;
};

// Get performance metrics
export const getPerformanceMetrics = () => {
  if (typeof window === 'undefined' || !performance) return null;
  
  const navigationEntries = performance.getEntriesByType('navigation');
  const paintEntries = performance.getEntriesByType('paint');
  
  if (navigationEntries.length === 0) return null;
  
  const navigation = navigationEntries[0] as PerformanceNavigationTiming;
  const paint = paintEntries;
  
  const metrics = {
    loadTime: navigation ? navigation.loadEventEnd - navigation.loadEventStart : 0,
    domContentLoaded: navigation ? navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart : 0,
    firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
    firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0,
    screenInfo: getScreenInfo()
  };
  
  logDebug('PERFORMANCE_MONITOR', 'Performance metrics', metrics, 'PERFORMANCE');
  return metrics;
};

// Export debugging utilities
export const DebugUtils = {
  init: initDebugging,
  log: logDebug,
  getScreenInfo,
  checkLayoutIssues,
  checkResponsiveBreakpoints,
  monitorResize,
  monitorScroll,
  checkHorizontalOverflow,
  getPerformanceMetrics
};