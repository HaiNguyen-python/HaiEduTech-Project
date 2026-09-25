# Make Apple Pay show on Card Payment

## Likely cause (to confirm first)
The checkout setup does not block Apple Pay. The usual reason it stays hidden on iPhone is that the website address (haiedutech.com) has not been registered for Apple Pay with Stripe. Stripe only shows the Apple Pay button on registered website addresses. This has not been checked yet, so step 1 checks it.

## Steps
1. **Check registration**: ask Stripe (live mode) which website addresses are registered for wallets and what status Apple Pay has for each.
2. **Register the addresses**: register `haiedutech.com`, `www.haiedutech.com` and `haiedutech.lovable.app` for Apple Pay and Google Pay. If one exists but is turned off or failed, turn it back on or check it again.
3. **Admin button**: add a small "Apple Pay domains" item to the Premium Members card in admin. It shows each address with its Apple Pay / Google Pay status and a "Register / Re-check" button, so you can fix this yourself if you add another domain later.
4. **Check the payment window**: confirm the security settings allow Apple Pay's window inside the Stripe form (add Apple Pay addresses to the allowed list if they are missing).
5. **Note under the card form**: add a short line: "Apple Pay appears in Safari when a card is saved in Apple Wallet."

## What you test after Publish
Open haiedutech.com in **Safari** on your iPhone, where a card is already saved in Wallet. Apple Pay does not show in Chrome on iPhone, in private browsing, or when Wallet has no card. Then go to Premium, then Card Payment.

## Technical details
- New admin-only edge function `stripe-payment-domains` (checks teacher/admin role): `GET` lists `paymentMethodDomains` (live), `POST` calls `paymentMethodDomains.create({domain_name})` or `.validate(id)` for each domain. Uses the existing `createStripeClient("live")`.
- If registering with the managed Stripe keys is refused, report it and fall back to connector guidance (unconfirmed).
- `index.html` CSP: make sure `frame-src` / `connect-src` include `https://*.stripe.com` and add `https://applepay.cdn-apple.com` / `https://pay.google.com` if needed.
- No change to price, session creation, or webhook.
