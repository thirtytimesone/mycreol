// Simple web app initialization
(function() {
    'use strict';

    // Wait for DOM to be ready
    function initApp() {
        // Hide the loading screen
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'none';
        }

        // Get the root element
        const root = document.getElementById('root');
        if (!root) {
            console.error('Root element not found');
            return;
        }

        // Create the main app content
        const appContent = document.createElement('div');
        appContent.style.cssText = `
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: 40px;
        `;

        appContent.innerHTML = `
            <div style="margin-bottom: 30px;">
                <h1 style="color: #007AFF; margin: 0 0 10px 0; font-size: 28px; font-weight: 600;">
                    🍽️ Toast Orders
                </h1>
                <p style="color: #666; margin: 0; font-size: 16px;">
                    Mobile ordering app with seamless restaurant orders
                </p>
            </div>

            <div style="margin-bottom: 30px;">
                <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
                    <h3 style="color: #333; margin: 0 0 10px 0; font-size: 18px;">🏠 Home</h3>
                    <p style="color: #666; margin: 0; font-size: 14px;">Browse featured restaurants and deals</p>
                </div>
                
                <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
                    <h3 style="color: #333; margin: 0 0 10px 0; font-size: 18px;">📋 Menu</h3>
                    <p style="color: #666; margin: 0; font-size: 14px;">Explore restaurant menus and items</p>
                </div>
                
                <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
                    <h3 style="color: #333; margin: 0 0 10px 0; font-size: 18px;">🛒 Cart</h3>
                    <p style="color: #666; margin: 0; font-size: 14px;">Review your selected items</p>
                </div>
                
                <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
                    <h3 style="color: #333; margin: 0 0 10px 0; font-size: 18px;">💳 Checkout</h3>
                    <p style="color: #666; margin: 0; font-size: 14px;">Complete your order and payment</p>
                </div>
                
                <div style="background: #f8f9fa; border-radius: 8px; padding: 20px;">
                    <h3 style="color: #333; margin: 0 0 10px 0; font-size: 18px;">📱 Order History</h3>
                    <p style="color: #666; margin: 0; font-size: 14px;">Track your past orders</p>
                </div>
            </div>

            <div style="margin-bottom: 20px;">
                <h4 style="color: #333; margin: 0 0 15px 0; font-size: 16px;">Features</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 10px; justify-content: center;">
                    <span style="background: #007AFF; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px;">AWS Integration</span>
                    <span style="background: #007AFF; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px;">Toast API</span>
                    <span style="background: #007AFF; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px;">Real-time Orders</span>
                    <span style="background: #007AFF; color: white; padding: 6px 12px; border-radius: 20px; font-size: 12px;">Payment Processing</span>
                </div>
            </div>

            <div style="padding: 15px; background: #e3f2fd; border-radius: 8px; border-left: 4px solid #007AFF;">
                <p style="margin: 0; color: #1976d2; font-size: 14px;">
                    <strong>📱 Mobile App Preview</strong><br>
                    This is a preview of the Toast Orders mobile application. The full app includes user authentication, real-time order tracking, and payment processing.
                </p>
            </div>
        `;

        // Add the content to the root
        root.appendChild(appContent);

        console.log('Toast Orders App loaded successfully');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
})();