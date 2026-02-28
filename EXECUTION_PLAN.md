# 30-Day Lean Execution Plan: SaaS App Store (MVP)

**Goal:** Validate demand, onboard 10-20 paying businesses, and 10 builders.
**Constraint:** Minimal tech, manual operations, zero ad spend.

## Week 1: Validation & Outreach (The "Do Things That Don't Scale" Phase)

**Objective:** Confirm the problem exists and secure initial interest.

**Days 1-3: Outreach to Builders (Supply Side)**
- **Goal:** Get 10 indie SaaS founders to agree to bundle their tool.
- **Action:**
  - DM founders on Twitter/X, IndieHackers, and Reddit.
  - **Pitch:** "I'm building a bundle for startups. I can put your tool in front of 50+ paid users next month. No cost to you, revenue share on every sub. Interested?"
  - **Result:** Secure 5-10 soft commitments.
  - **Artifact:** Simple spreadsheet with Tool Name, Pricing, Founder Contact.

**Days 4-7: Outreach to Startups (Demand Side)**
- **Goal:** Get 50 signups for the waitlist.
- **Action:**
  - Post in communities: collaborative work Slack groups, founder micro-communities.
  - **Cold Outreach:** Email founders of recently funded seed/pre-seed startups (find on Crunchbase or Twitter).
  - **Pitch:** "We're bundling $400/mo worth of essential tools (Project Mgmt, CRM, Marketing) for $100/mo. Want early access?"
  - **Artifact:** Email list of interested buyers.

## Week 2: Build Lean Visual MVP (The "Facade" Phase)

**Objective:** A deployable site that looks professional enough to take payments manually.

**Days 8-10: Frontend Development (Completed)**
- Deploy the React MVP (Home, Store, Apply pages) to Vercel/Netlify.
- Ensure the "Apply" form works (use Typeform or Google Forms link if backend isn't ready, or the mock form we built).
- **Key:** Use real logos/screenshots from the 10 builders recruited in Week 1.

**Days 11-14: Manual Operations Setup**
- **Billing:** Set up a simple Stripe Payment Link (Subscription) or Gumroad page.
- **Access:** Create a manual "Welcome Email" template.
  - *Process:* User pays -> You receive email -> You manually send them coupon codes or invite links to the bundled tools.
- **Data:** Update `tools.js` with the actual tools committed in Week 1.

## Week 3: Launch & Onboarding (The "Concierge" Phase)

**Objective:** Get first 10 paying customers ($1000 MRR).

**Days 15-17: Soft Launch**
- Email the 50 waitlist people personal invites.
- **Offer:** "Founding Member" status (lock in price forever).
- **Operation:** Monitor the Stripe link. When a sale comes in, manually onboard them to each tool within 24 hours.

**Days 18-21: Direct Sales**
- If waitlist conversion is low, do direct sales calls/DMs.
- Ask for feedback: "Why didn't you buy?"
- **Pivot if needed:** If price is wrong or tools aren't valuable enough, adjust the bundle.

## Week 4: Feedback & Iteration

**Objective:** Learn and stabilize.

**Days 22-25: Founder Feedback**
- Talk to the paying customers.
  - Are they using the tools?
  - What tools are missing?
- Talk to the builders.
  - Are they happy with the potential exposure?

**Days 26-30: Prepare for Automation**
- Identify the biggest pain point (likely manual onboarding).
- Plan the next build: Automated email delivery or simple auth management.
- **Decision:** Double down (if profitable/growing) or Pivot.

---

**Summary:**
- **No complex backend code** until you have 20 paying customers.
- **Manual everything:** Onboarding, billing, support.
- **Focus:** Closing deals and talking to founders.
