import React from 'react';
import { Star, Globe, PhoneCall, PhoneMissed, Search, TrendingUp } from 'lucide-react';

export type Faq = { q: string; a: string };

export type Product = {
  slug: string;
  name: string;
  icon: React.ElementType;
  /** One line, used in the Products menu, footer and related cards. */
  short: string;
  /** Benefit label shown in the pill on product cards. */
  benefit: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  intro: string[];
  steps: { title: string; text: string }[];
  included: string[];
  whoFor: string[];
  faqs: Faq[];
  /** Only set where the product is part of a published pricing tier. */
  pricing?: { tier: string; price: number };
  related: string[];
};

export const productPath = (slug: string) => `/products/${slug}`;

export const products: Product[] = [
  {
    slug: 'google-review-automation',
    benefit: 'Attract New Customers',
    name: 'Google Review Automation',
    icon: Star,
    short: 'Automated review requests that get you more 5-star Google reviews.',
    metaTitle: 'Google Review Automation for UK Local Businesses | LeapLayer',
    metaDescription: 'Automated review requests by text after every job, follow-up reminders and an NFC tap-to-review card. Get more Google reviews without chasing customers.',
    eyebrow: 'Google review automation',
    h1: 'Get more Google reviews with automated review requests',
    lead: 'Great customers forget to review. We set up a system that asks every customer for a Google review after the job, follows up if they forget, and shares new 5-star reviews on your social media.',
    intro: [
      'Most happy customers mean to leave a review and never get round to it. The people who write one without being asked are often the ones with a complaint. That leaves plenty of good businesses with fewer reviews than they deserve, and a lower spot on Google Maps than a competitor who simply asks more often.',
      'Our review system does the asking for you. When a job is done, your customer gets a short, personal text with a direct link to your Google review page. If they haven\'t left a review after a few days, a polite reminder goes out. For customers you see face to face, a tap-to-review NFC card opens your review page with a tap of their phone.',
      'Google now gives more weight to fresh reviews and how often new ones come in, so a steady flow matters more than a pile of reviews from years ago. Automating the request is the simplest way to keep that flow going.',
    ],
    steps: [
      { title: 'We connect it to your business', text: 'We link your Google Business Profile and set up your review link, the message wording and the timing that suits your jobs.' },
      { title: 'A request goes out after every job', text: 'When a job is complete, your customer gets a personal text asking for a review, with one tap through to your Google review page.' },
      { title: 'Polite follow-ups', text: 'If they haven\'t reviewed after a few days, a reminder goes out. After the last one, they aren\'t messaged again.' },
      { title: 'New reviews get shared', text: 'New 5-star reviews are turned into a graphic and posted to your social media, so each one works for you twice.' },
    ],
    included: [
      'Automated review request texts after every job',
      'Message wording written in your business\'s voice',
      'Follow-up reminders for customers who haven\'t reviewed yet',
      'NFC tap-to-review card for customers you see in person',
      'A direct link to your Google review page, no searching',
      'New 5-star reviews auto-posted to your social media',
      'Set up and managed for you',
    ],
    whoFor: [
      'Trades and home services who finish jobs on site',
      'Clinics, salons and studios with regular appointments',
      'Shops, cafés and venues with face-to-face customers',
      'Any local business with fewer Google reviews than its competitors',
      'Owners who know they should ask for reviews but never have the time',
    ],
    faqs: [
      { q: 'Is it allowed to automate Google review requests?', a: 'Yes. Google allows businesses to ask customers for reviews. What it doesn\'t allow is offering rewards for reviews, or only asking the customers you expect to be happy. Our system sends the same request to every customer, which keeps you within Google\'s guidelines.' },
      { q: 'Do the reviews go to my Google Business Profile?', a: 'Yes. The link in every text, and on the NFC card, opens your Google review page directly, so customers can leave a star rating and a comment in a few seconds.' },
      { q: 'How does the NFC tap-to-review card work?', a: 'The card has a small chip inside. A customer taps it with their phone and your Google review page opens, with no app to download. It works with most modern smartphones.' },
      { q: 'How many reminders do customers get?', a: 'One or two at most, spaced a few days apart. Once a customer has left a review, or after the last reminder, they won\'t be messaged again.' },
      { q: 'What happens if someone leaves a bad review?', a: 'It goes to Google like any other review. A calm, professional reply to a bad review is often what new customers notice most, and a steady flow of genuine reviews means one bad one carries far less weight.' },
      { q: 'How much does the review system cost?', a: 'It\'s part of our Growth Package at £197 per month, which also includes a smart website and missed call text back. There are no setup fees and no contracts.' },
    ],
    pricing: { tier: 'Growth Package', price: 197 },
    related: ['smart-website', 'missed-call-text-back'],
  },
  {
    slug: 'smart-website',
    benefit: 'Convert More Leads',
    name: 'Smart Website',
    icon: Globe,
    short: 'A lead-generating website built and launched in days.',
    metaTitle: 'Websites for Local Businesses with Lead Capture | LeapLayer',
    metaDescription: 'A fast, SEO-ready website for your local business, built and hosted for you. Every enquiry is captured and texted straight to your phone. From £97 a month.',
    eyebrow: 'Smart website',
    h1: 'A smart website that turns visitors into enquiries',
    lead: 'A website built to rank, with lead capture on every page. When someone gets in touch, it lands on your phone as a text conversation, so you can reply in minutes.',
    intro: [
      'For most local businesses, the website is the first thing a new customer checks after finding you on Google. If it\'s slow, hard to use on a phone, or awkward to get in touch through, they go back and try the next result.',
      'We build your site around getting enquiries: clear service pages, a fast mobile layout, click-to-call and short enquiry forms on every page. When a visitor fills one in, an automated reply goes out straight away and the conversation comes through to your phone as a text, so you can carry it on from wherever you are.',
      'Hosting, maintenance and security are handled for you, and every page is built with the structure Google needs to understand what you do and where you work.',
    ],
    steps: [
      { title: 'We learn your business', text: 'A short call about your services, your area and the customers you want more of.' },
      { title: 'We design and write it', text: 'We design the site, write your service pages and set up the enquiry forms. You review it before it goes live.' },
      { title: 'It goes live', text: 'We launch it on your domain, link it to your Google Business Profile and check it loads quickly on phones.' },
      { title: 'We look after it', text: 'Hosting, maintenance and security are taken care of every month.' },
    ],
    included: [
      'A full website, designed and written for you',
      '5 service pages',
      'Lead capture forms on every page',
      'Instant automated replies to new enquiries',
      'Enquiries sent to your phone as a text conversation',
      'Fast, mobile-first pages',
      'SEO-ready page structure',
      'Hosting, maintenance and security',
    ],
    whoFor: [
      'Businesses with no website, or one that\'s years out of date',
      'Trades and services who win most of their work from Google searches',
      'Owners who miss enquiries because they\'re busy on jobs',
      'Anyone paying for a website that doesn\'t bring in work',
    ],
    faqs: [
      { q: 'How much does a smart website cost?', a: 'It\'s our Minimum Package at £97 per month, with no setup fee and no contract. Hosting, maintenance and security are included.' },
      { q: 'How long does it take to build?', a: 'Most sites are built and launched in days rather than months. The main thing that affects timing is how quickly we can agree the content with you.' },
      { q: 'How do enquiries reach me?', a: 'When someone fills in a form, they get an instant reply and the conversation is sent to your phone as a text. You reply from your phone and the customer receives it as a normal message.' },
      { q: 'Will my website show up on Google?', a: 'It\'s built with what Google looks for: fast pages, clear headings, a page for each service and the right technical setup. Rankings also depend on your reviews and Google Business Profile, which is why many businesses pair it with our review system and local SEO.' },
      { q: 'I already have a website. Can you replace it?', a: 'Yes. We can rebuild it as a smart website on the same domain, so you keep the address your customers already know.' },
    ],
    pricing: { tier: 'Minimum Package', price: 97 },
    related: ['google-review-automation', 'local-seo'],
  },
  {
    slug: 'ai-receptionist',
    benefit: 'Never Miss A Call',
    name: 'AI Receptionist',
    icon: PhoneCall,
    short: 'A 24/7 AI receptionist that answers every call and books appointments.',
    metaTitle: 'AI Receptionist for Small Businesses in the UK | LeapLayer',
    metaDescription: 'A 24/7 AI receptionist that answers every call, books appointments and captures new leads, so you never miss a customer while you\'re busy. From £599 a month.',
    eyebrow: 'AI receptionist',
    h1: 'An AI receptionist that answers every call, day and night',
    lead: 'A 24/7 voice AI receptionist that picks up when you can\'t, answers common questions, books the appointment and passes on the details.',
    intro: [
      'Every missed call is a customer who might ring the next business on Google instead. For a small team, answering the phone while you\'re on a job, with a customer or out of hours just isn\'t always possible.',
      'Our AI receptionist answers in a natural voice at any time of day. It can explain your services, answer the questions you\'re asked most often, take the caller\'s details and book them into your calendar, so every caller leaves with an answer or an appointment.',
      'It\'s set up around your business: your services, your opening hours, your prices if you want to share them, and how you\'d like enquiries handled. When a call needs you personally, it takes the details and passes them on so you can call back.',
    ],
    steps: [
      { title: 'We learn how you take calls', text: 'Your services, the questions callers ask, your booking rules and what should come straight to you.' },
      { title: 'We set up your receptionist', text: 'We build the voice assistant around your business and connect it to your calendar.' },
      { title: 'It answers your calls', text: 'Calls are answered 24/7. It answers questions, books appointments and takes messages.' },
      { title: 'You follow up where it matters', text: 'Every caller\'s details are captured, and calls that need you are passed on so you can call back.' },
    ],
    included: [
      '24/7 call answering in a natural voice',
      'Answers to your most common questions',
      'Books, reschedules and cancels appointments',
      'Captures every caller\'s details',
      'Follow-ups and reminders for booked customers',
      'Passes on the calls that need you',
      'Everything in the Growth Package: smart website, review system and missed call text back',
    ],
    whoFor: [
      'Businesses that miss calls while working on jobs',
      'Clinics, salons and practices that take bookings by phone',
      'Teams that get calls outside opening hours',
      'Owners who spend hours a week answering the same questions',
    ],
    faqs: [
      { q: 'Does it sound like a robot?', a: 'It speaks in a natural, conversational voice and handles back and forth like a person would. Callers simply talk to it, with no buttons to press.' },
      { q: 'Can it book appointments into my calendar?', a: 'Yes. It can book, reschedule and cancel appointments during the call, using the availability you set.' },
      { q: 'What happens if a caller needs to speak to me?', a: 'You decide which calls should come to you. For those, it takes the details and passes them on so you can call back.' },
      { q: 'Does it work out of hours?', a: 'Yes. It answers 24 hours a day, 7 days a week, including evenings and weekends.' },
      { q: 'How much does the AI receptionist cost?', a: 'It\'s part of our Scaling Package at £599 per month, which also includes everything in the Growth Package: a smart website, the review system and missed call text back. There are no setup fees and no contracts.' },
    ],
    pricing: { tier: 'Scaling Package', price: 599 },
    related: ['missed-call-text-back', 'lead-tracking-dashboard'],
  },
  {
    slug: 'missed-call-text-back',
    benefit: 'Never Lose A Lead',
    name: 'Missed Call Text Back',
    icon: PhoneMissed,
    short: 'Automatically text back missed calls so you never lose a customer.',
    metaTitle: 'Missed Call Text Back for Small Businesses | LeapLayer',
    metaDescription: 'When you can\'t answer, callers get an instant text from your business so the conversation keeps going. Stop losing customers to missed calls. From £197 a month.',
    eyebrow: 'Missed call text back',
    h1: 'Missed call text back, so a missed call isn\'t a lost customer',
    lead: 'When you can\'t pick up, the caller gets a text from your business within seconds, and the conversation carries on by message until you\'re free.',
    intro: [
      'When a new customer calls and nobody answers, most won\'t leave a voicemail. They hang up and ring the next business on the list. If you\'re on a job, driving or with another customer, that can happen several times a day without you knowing.',
      'Missed call text back sends a friendly, automatic text to anyone whose call you miss, letting them know you\'ll be in touch and inviting them to reply with what they need. Plenty of customers are happy to text, so the conversation often moves forward before you\'ve finished what you were doing.',
      'Replies come through to your phone, so you can pick the conversation up whenever you\'re free, with the customer\'s details already in front of you.',
    ],
    steps: [
      { title: 'We set it up on your number', text: 'We connect missed call text back to your business phone number.' },
      { title: 'You miss a call', text: 'You\'re on a job or it\'s out of hours, and the call goes unanswered.' },
      { title: 'They get a text in seconds', text: 'An automatic message in your business\'s name lets them know you\'ll help and asks what they need.' },
      { title: 'You carry on by text', text: 'Their reply lands on your phone, so you can respond as soon as you\'re free.' },
    ],
    included: [
      'An automatic text to every missed caller',
      'Message wording written in your business\'s voice',
      'Two-way texting from your phone',
      'Caller details saved, so no lead gets lost',
      'Works with your business number',
      'Set up and managed for you',
    ],
    whoFor: [
      'Trades and services who can\'t answer while on a job',
      'Small teams without a receptionist',
      'Businesses that get calls in the evening or at weekends',
      'Anyone who has lost work to a competitor who answered first',
    ],
    faqs: [
      { q: 'How quickly does the text go out?', a: 'Within seconds of the missed call, so the caller hears from you while they\'re still deciding who to contact.' },
      { q: 'Can I change what the message says?', a: 'Yes. We write it with you so it sounds like your business, and it can be updated whenever you like.' },
      { q: 'Do I need a new phone number?', a: 'No, it works with your business number. If you\'d like a separate number for the business, we can set one up.' },
      { q: 'What happens when the customer replies?', a: 'Their reply comes through to your phone as a normal conversation, so you can answer when you\'re free.' },
      { q: 'How much does missed call text back cost?', a: 'It\'s included in our Growth Package at £197 per month, alongside a smart website and the Google review system. There are no setup fees and no contracts.' },
    ],
    pricing: { tier: 'Growth Package', price: 197 },
    related: ['ai-receptionist', 'smart-website'],
  },
  {
    slug: 'local-seo',
    benefit: 'Get Found First',
    name: 'Local SEO',
    icon: Search,
    short: 'Get found first when local customers search on Google.',
    metaTitle: 'Local SEO and Google Maps Ranking | LeapLayer',
    metaDescription: 'Local SEO for UK small businesses: Google Business Profile optimisation, local service pages and steady review growth to help you show up in the map results.',
    eyebrow: 'Local SEO',
    h1: 'Local SEO that helps local customers find you first',
    lead: 'SEO takes time, don\'t let anyone tell you otherwise. But the earlier the right process is put in place, the sooner you\'re the one local customers find first when they search Google.',
    intro: [
      'When someone searches for a service near them, Google shows a map with a handful of businesses above the normal results. Being in that group, often called the local pack, is where a large share of local enquiries come from.',
      'Getting there depends on several things working together: a complete and active Google Business Profile, a website Google can understand, consistent business details across the web, and a steady flow of fresh reviews. Google\'s 2026 changes put more weight on recent activity, so a profile that goes quiet slips down.',
      'We work on all of it month by month and keep you updated in plain English. It won\'t happen overnight, but each month\'s work builds on the last.',
    ],
    steps: [
      { title: 'Audit', text: 'We check your Google Business Profile, website and listings to see where you stand against local competitors.' },
      { title: 'Fix the foundations', text: 'Your profile set up properly, categories and services filled in, and your business details made consistent everywhere.' },
      { title: 'Build steady activity', text: 'Regular profile updates, local service pages and a consistent flow of new reviews.' },
      { title: 'Report and adjust', text: 'Progress reported in plain English, with the plan adjusted towards what\'s working.' },
    ],
    included: [
      'Google Business Profile optimisation',
      'Local service and area pages',
      'Consistent business listings across the web',
      'Regular Google Business Profile updates',
      'Review growth through our review system',
      'Plain-English progress updates',
    ],
    whoFor: [
      'Businesses that don\'t appear in the map results for their main services',
      'New businesses starting from zero',
      'Businesses losing work to competitors with more reviews',
      'Owners who\'ve been let down by agencies promising instant results',
    ],
    faqs: [
      { q: 'How long does local SEO take to work?', a: 'It depends on your area and how competitive your services are. Some fixes, like a properly set up Google Business Profile, can help fairly quickly, but steady ranking gains usually build over several months.' },
      { q: 'What is the Google local pack?', a: 'It\'s the map and short list of businesses Google shows for local searches, like "plumber near me". It sits above the normal results, so it gets a large share of the clicks and calls.' },
      { q: 'Do reviews help local SEO?', a: 'Yes. Google looks at how many reviews you have, how recent they are and how often new ones come in. That\'s why our review system and local SEO work well together.' },
      { q: 'Can you guarantee the top spot on Google?', a: 'No, and nobody honestly can, because Google decides the rankings. What we can do is put the right work in consistently, which is what moves businesses up over time.' },
      { q: 'How much does local SEO cost?', a: 'It depends on your area and your goals. Book a free 15-minute AI audit and we\'ll look at where you stand and what it would take.' },
    ],
    related: ['google-review-automation', 'smart-website'],
  },
  {
    slug: 'lead-tracking-dashboard',
    benefit: 'See Your Results',
    name: 'Track Everything',
    icon: TrendingUp,
    short: 'See every lead, appointment and the revenue they bring in.',
    metaTitle: 'Lead Tracking Dashboard for Small Businesses | LeapLayer',
    metaDescription: 'See every lead, appointment and the revenue your marketing brings in, all in one dashboard. Know exactly what\'s working for your local business.',
    eyebrow: 'Track everything',
    h1: 'Track every lead, booking and sale in one dashboard',
    lead: 'See every opportunity, appointment and the revenue these systems generate, all in one dashboard.',
    intro: [
      'Most small businesses can\'t easily say where their last ten customers came from. Enquiries arrive by phone, text, website forms and social media, and they end up scattered across notebooks, inboxes and memory.',
      'Our dashboard brings them into one place. Every new lead is logged, and you can see which ones turned into appointments, which became paying jobs, and how much revenue the whole system has brought in.',
      'With that view you can follow up on leads that went quiet, make better decisions about where to spend, and see clearly what you\'re getting for your money.',
    ],
    steps: [
      { title: 'Connect your channels', text: 'Calls, texts, website forms and social messages feed into one place.' },
      { title: 'Every lead is logged', text: 'New enquiries appear automatically with their details and where they came from.' },
      { title: 'Track their progress', text: 'Move leads from enquiry to booked to paid, so nothing is forgotten.' },
      { title: 'See the results', text: 'Live reporting on opportunities, appointments and revenue.' },
    ],
    included: [
      'Live opportunity tracking',
      'Appointment tracking',
      'Revenue reporting',
      'Every lead in one dashboard',
      'Where each lead came from',
      'Instagram, Facebook and website messages in one inbox',
    ],
    whoFor: [
      'Owners who want to know which marketing actually brings in work',
      'Businesses juggling enquiries across calls, texts and social media',
      'Teams that lose track of quotes and follow-ups',
      'Anyone who wants to see the return on what they spend',
    ],
    faqs: [
      { q: 'What does the dashboard track?', a: 'New leads, where they came from, the appointments booked and the revenue from jobs won, all in one view.' },
      { q: 'Do I have to enter everything by hand?', a: 'No. Leads from your website, calls, missed call texts and connected social channels are added automatically. You update a lead\'s status as it moves to booked or paid.' },
      { q: 'Does it work with the other LeapLayer systems?', a: 'Yes. It\'s built to sit alongside the smart website, review system, missed call text back and AI receptionist, so their leads and bookings appear in the same place.' },
      { q: 'How much does it cost?', a: 'Book a free 15-minute AI audit and we\'ll recommend the setup that fits your business.' },
    ],
    related: ['ai-receptionist', 'smart-website'],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const pricingPlans: {
  name: string,
  price: number,
  wasPrice?: number,
  intro?: string,
  inheritsLabel?: string,
  features: string[],
  mostPopular?: boolean,
  checkoutUrl?: string,
  ctaLabel?: string,
}[] = [
  {
    name: 'Minimum Package',
    price: 97,
    wasPrice: 750,
    intro: 'Your online foundation, done for you.',
    features: [
      'Full professional website',
      '5 service pages',
      'Smart Website with lead capture',
      'Automated lead follow-up',
      'Hosting',
      'Maintenance and security',
    ],
    checkoutUrl: 'https://buy.stripe.com/8x228r39I4gj1CS2mh48002',
  },
  {
    name: 'Growth Package',
    price: 197,
    wasPrice: 2000,
    inheritsLabel: 'the Minimum Package',
    features: [
      'Smart Website',
      'Google Review Automation',
      'Missed Call Text Back',
    ],
    mostPopular: true,
  },
  {
    name: 'Scaling Package',
    price: 599,
    inheritsLabel: 'the Growth Package',
    features: [
      '24/7 Voice AI Receptionist',
      'Answers every call and books appointments',
      'Saves you time and captures more leads',
      'Advanced SEO, built for Google and AI search',
    ],
    ctaLabel: 'See More',
  },
];

