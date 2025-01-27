import { createContext, MutableRefObject, useCallback, useRef } from 'react';
import WebView from 'react-native-webview';

interface WebViewContextType {
  webViewRefs: MutableRefObject<WebView[]>;
  addWebView: (webView: WebView) => void;
}

export const WebViewContext = createContext<WebViewContextType | undefined>(undefined);

export function WebViewProvider({ children }: { children: React.ReactNode }) {
  const webViewRefs = useRef<WebView[]>([]);

  const addWebView = useCallback((webView: WebView) => {
    webViewRefs.current.push(webView);
  }, []);

  return <WebViewContext.Provider value={{ webViewRefs, addWebView }}>{children}</WebViewContext.Provider>;
}
