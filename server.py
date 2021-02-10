
#!/usr/bin/env python3
# encoding: utf-8
"""Use instead of `python3 -m http.server` when you need CORS"""

from http.server import HTTPServer, SimpleHTTPRequestHandler

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Set-Cookie', 'server_cookie=8000')
        self.extensions_map.update(
		{
        '.manifest': 'text/cache-manifest',
        '.html': 'text/html',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.svg': 'image/svg+xml',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '': 'application/octet-stream', # Default
		}
		)
        return super(CORSRequestHandler, self).end_headers()

httpd = HTTPServer(('localhost', 8000), CORSRequestHandler)

httpd.serve_forever()

