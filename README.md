Macaroni Extension
====================

A browser extension to add yara tags to VirusTotal Intelligence (aka VTMIS). This repository contains code for Chromium/Chrome and Firefox browsers. Windows users beware that self-hosted browser extensions are not supported in Chrome anymore :( 


Create Firefox Addon (.xpi bundle)
---------------------
1. Install Firefox Addon SDK 
2. Clone repository
3. In the Firefox SDK directory, run:
        bin/cfx xpi --pkgdir=PATH_TO_FIREFOX_ADDON_SOURCE
4. This command will generate an .xpi file


Create Chrome Extension (.crx bundle)
---------------------
1. In Chromium, go to Settings > Tools > Extensions
2. Make sure 'Developer mode' is checked
3. Click 'Load unpacked extension'
4. Click 'Pack extension'
5. Select or create private key
6. Pack and voila


Setup
---------------------
Once installed, the extension must be configured.

Firefox
1. Point your browser to about:addons
2. Enter API key and API host. 

Chrome
1. Go to Settings > Tools > Extensions
2. Find the Macaroni extension and click on "options.html"
3. Enter at least the API server hostname and your API key


Contact
---------------------
nick@sinkhole.me
nsummerlin@isightpartners.com