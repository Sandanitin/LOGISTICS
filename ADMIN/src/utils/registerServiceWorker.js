// Service worker registration
export const register = () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register(swUrl);
          
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }
            
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New content is available, inform the user
                  console.log('New content is available; please refresh.');
                  // Optional: Show an update notification to the user
                  if (window.confirm('A new version is available. Would you like to update now?')) {
                    window.location.reload();
                  }
                } else {
                  console.log('Content is cached for offline use.');
                }
              }
            };
          };
          
          // Check for updates every hour
          setInterval(() => {
            registration.update().catch(error => {
              console.error('Error during service worker update:', error);
            });
          }, 60 * 60 * 1000);
          
        } catch (error) {
          console.error('Error during service worker registration:', error);
        }
      };

      // Register service worker
      if (window.caches) {
        registerSW();
      }
    });
  }
};

// Unregister service worker (for development)
export const unregister = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
};

// Check if the app is running in standalone mode
export const isRunningStandalone = () => {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone ||
    document.referrer.includes('android-app://')
  );
};

// Add to home screen prompt
let deferredPrompt;

export const initAddToHomeScreen = () => {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Show your custom "Add to Home Screen" button or UI element
    showAddToHomeScreenButton();
  });
};

const showAddToHomeScreenButton = () => {
  // Show your custom button or UI element
  // When clicked, call promptAddToHomeScreen()
};

export const promptAddToHomeScreen = async () => {
  if (!deferredPrompt) return false;
  
  try {
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // Optionally, send analytics about the user's choice
    console.log(`User response to the install prompt: ${outcome}`);
    
    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null;
    
    return outcome === 'accepted';
  } catch (error) {
    console.error('Error showing install prompt:', error);
    return false;
  }
};
