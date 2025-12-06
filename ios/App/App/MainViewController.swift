import UIKit
import Capacitor
import WebKit

@objc(MainViewController)
class MainViewController: CAPBridgeViewController {
    override open func webViewConfiguration(for instanceConfiguration: InstanceConfiguration) -> WKWebViewConfiguration {
        let configuration = super.webViewConfiguration(for: instanceConfiguration)
        configuration.preferences.javaScriptEnabled = true
        configuration.preferences.javaScriptCanOpenWindowsAutomatically = true
        configuration.setValue(true, forKey: "allowFileAccessFromFileURLs")
        configuration.setValue(true, forKey: "allowUniversalAccessFromFileURLs")
        configuration.allowsInlineMediaPlayback = true
        configuration.suppressesIncrementalRendering = false
        return configuration
    }

    override open func webView(with frame: CGRect, configuration: WKWebViewConfiguration) -> WKWebView {
        let webView = super.webView(with: frame, configuration: configuration)
        webView.allowsBackForwardNavigationGestures = true
        webView.allowsLinkPreview = false
        return webView
    }

    func applyRuntimePreferences() {
        guard let webView = bridge?.webView else { return }
        webView.configuration.preferences.javaScriptEnabled = true
        webView.configuration.preferences.javaScriptCanOpenWindowsAutomatically = true
        webView.configuration.setValue(true, forKey: "allowFileAccessFromFileURLs")
        webView.configuration.setValue(true, forKey: "allowUniversalAccessFromFileURLs")
    }

    override open func viewDidLoad() {
        super.viewDidLoad()
        applyRuntimePreferences()
        
        // Debug: Check if bridge is initialized
        print("🔍 MainViewController viewDidLoad - Bridge: \(String(describing: bridge))")
        
        // Debug: Check webView after a delay
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            if let webView = self.bridge?.webView {
                print("✅ WebView found: \(webView)")
                print("📍 Current URL: \(webView.url?.absoluteString ?? "nil")")
            } else {
                print("❌ WebView not found!")
            }
        }
    }
    
    override open func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        print("🔍 MainViewController viewDidAppear")
        
        // Check if webView is loading
        if let webView = self.bridge?.webView {
            print("📍 WebView URL: \(webView.url?.absoluteString ?? "nil")")
            print("📍 WebView isLoading: \(webView.isLoading)")
        }
    }
}
