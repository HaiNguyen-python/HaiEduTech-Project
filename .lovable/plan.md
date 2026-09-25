# English-only Upgrade Account and Apple Pay reliability

## Upgrade Account language
- Make the entire Upgrade Account window English-only, independent of the site's language setting.
- Replace every Vietnamese label, message, toast, transfer instruction, comparison row, perk, and accessibility label rendered inside this window with English text.
- Change every visible duration label to `1 year` or `12 months`, including the Stripe product display where controlled by the payment catalog.

## Apple Pay diagnosis and correction
- Verify the live and preview payment-domain registration status and inspect the actual embedded Checkout session settings.
- Ensure Checkout is created with payment methods managed dynamically by Stripe and without conflicting parameters that can suppress wallets.
- Confirm the custom domains used by customers are active for Apple Pay and surface a clear diagnostic in admin if a domain is not eligible.
- Keep Apple Pay inside Stripe's secure embedded form. It will display only when Stripe reports the browser, device, Wallet card, domain, and payment configuration as eligible.

## Verification
- Test the Upgrade Account window in English mode and Vietnamese site mode to confirm no Vietnamese text remains.
- Check the embedded payment form in preview and inspect network/runtime errors.
- Verify desktop and mobile layouts, then report any device-side Apple Pay eligibility requirement that cannot be simulated in Chromium.
