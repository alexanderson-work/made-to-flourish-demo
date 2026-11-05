// Content for the 2026 event, as published on the Framer site. Contact details come from environment variables
// (see .env.example) so they stay out of version control.
export const contact = {
  name: import.meta.env.PUBLIC_CONTACT_NAME || 'our team',
  email: import.meta.env.PUBLIC_CONTACT_EMAIL || 'hello@example.org',
  phone: import.meta.env.PUBLIC_CONTACT_PHONE || '000-000-0000',
};

export const event = {
  name: 'Experience Made to Flourish',
  dates: 'February 24–26, 2026',
  venue: 'The Crossroads Hotel',
  city: 'Kansas City, MO',
  description:
    'An invitation-only, two-day gathering in Kansas City exploring how faith shapes our everyday work, February 24–26, 2026.',
};

export const nav = [
  { label: 'Speakers', href: '/#speakers' },
  { label: 'Venue', href: '/#venue' },
  { label: 'About', href: '/#about' },
  { label: 'Schedule', href: '/#schedule' },
  { label: 'Stories', href: '/#stories' },
];

export const footerNav = [
  [
    { label: 'Speakers', href: '/#speakers' },
    { label: 'Schedule', href: '/#schedule' },
    { label: 'Venue', href: '/#venue' },
    { label: 'Stories', href: '/#stories' },
  ],
  [{ label: 'About', href: '/#about' }],
];

export const invitation = [
  'We are delighted to invite you to Experience Made to Flourish, a thoughtfully curated two-day gathering designed to immerse you in how faith shapes our everyday work and connects us more deeply to God’s redemptive story.',
  'This experience brings together pastors, marketplace leaders, and donors from across the country to explore what it means to live out a biblical vision of vocation in every sphere of life. Through stories, shared reflection, and compelling speakers, you will see how our work helps restore shalom by forming whole-life disciples that contribute to the flourishing of families, workplaces, and communities.',
  'Throughout the experience you will witness moments of our annual Residency Gathering, offering a firsthand look at how pastors are being equipped and sent back into their congregations with renewed vision. At other times, you will gather in a close-knit group for purposefully designed sessions that invite reflection, conversation, and connection. You will leave inspired with greater vision for how Made to Flourish is partnering with God in a variety of initiatives to join in God’s redemptive story. It is our pleasure to host you at no cost for this invitation-only experience, including lodging at the highly regarded Crossroads Hotel in downtown Kansas City, along with all meals. Participants are responsible only for airfare and ground transportation.',
];

export const venue = {
  tag: 'About the Venue',
  title: 'The Crossroads Hotel',
  subtitle: 'Kansas City, MO',
  body: 'The Crossroads Hotel in Kansas City is a stylish and contemporary venue that perfectly integrates luxury with the vibrant soul and culture of the Crossroads Arts District. It occupies the historic Pabst and Pendergrast buildings, showcasing a design that melds the area’s rich history with modern flair. The hotel features 132 beautifully appointed rooms with custom furnishings, reclaimed wood floors, and unparalleled city views, offering a unique and comfortable stay.',
  link: { label: 'Explore the Venue', href: 'https://crossroadshotelkc.com' },
};

export const stadium = {
  tag: 'Kansas City Chiefs Stadium Experience',
  title: 'An Inside Look at Faith at Work',
  subtitle: 'Arrowhead Stadium',
  body: 'Step behind the scenes at Arrowhead Stadium and see how faith and vocation intersect at the highest level of professional sports. The Hunt family—owners of the Kansas City Chiefs—have long viewed their work as part of God’s redemptive story. During this special experience, you’ll enjoy a private stadium tour and hear from the Chiefs’ chaplain about how faith shapes leadership, culture, and life inside the organization.',
};

export const highlights = [
  { markers: 1, title: 'Hear Inspiring Stories', body: 'Hear how business leaders, pastors, and congregations are being transformed by bridging the divide between Sunday worship and Monday work.' },
  { markers: 2, title: 'Have Engaging Conversations', body: 'Network with like-minded Christian leaders committed to advancing God’s mission through their vocations.' },
  { markers: 3, title: 'Help Shape The Vision', body: 'Learn how you can partner with Made to Flourish to empower churches and communities to flourish.' },
];

export type Row = { time: string; datetime: string; title: string; details?: string; location?: string };
export const schedule: { day: string; date: string; rows: Row[] }[] = [
  {
    day: 'Tuesday',
    date: '2026-02-24',
    rows: [
      { time: '3:30pm', datetime: '15:30', title: 'Welcome & Experience Kick-Off', location: 'Marriott Downtown' },
      { time: '4:15pm', datetime: '16:15', title: 'Opening Session: Faith, Work & the Redemptive Story', details: 'Alongside the Pastoral Residency Gathering', location: 'Marriott Downtown' },
      { time: '7:00pm', datetime: '19:00', title: 'A Private Curated Dinner Experience', details: 'Enjoy a thoughtfully curated dinner designed for connection and conversation.', location: 'Lidia’s Restaurant' },
    ],
  },
  {
    day: 'Wednesday',
    date: '2026-02-25',
    rows: [
      { time: '8:15am', datetime: '08:15', title: 'Breakfast & Morning Sessions', location: 'Four Chapter Gallery' },
      { time: '12:30pm', datetime: '12:30', title: 'Lunch & Private Kansas City Chiefs Stadium Experience', details: 'Step behind the scenes at Arrowhead Stadium and explore how faith shapes leadership, culture, and vocation within the Kansas City Chiefs organization.', location: 'Rockhill Grille' },
      { time: '4:00pm', datetime: '16:00', title: 'Unhurried Time for Rest & Reflection' },
      { time: '6:30pm', datetime: '18:30', title: 'A Celebration of Community', details: 'Join us for an evening alongside the Pastoral Residency Gathering celebrating shared vision, partnership, and the work God is doing through this community.', location: 'Marriott Downtown' },
    ],
  },
  {
    day: 'Thursday',
    date: '2026-02-26',
    rows: [
      { time: '8:00am', datetime: '08:00', title: 'Breakfast & Closing Conversation', details: 'A final gathering to reflect, pray, and look ahead—concluding by 10:00 AM.', location: 'Four Chapter Gallery' },
    ],
  },
];
export const scheduleNote = 'This gathering is intentionally designed with space for conversation, reflection, and meaningful connection.';

export const stories = [
  { title: 'Student Resource Impact', quote: '“One of our college students just started working at a sandwich shop. One of the most provocative things he’s taken away so far is how ‘all of work is ministry.’ He completely views his work in a whole new way. His new bosses have already commented that they’ve never had an employee learn the job as fast or work as hard as him, all because of this new perspective from Worked Up.”', name: 'Jake', role: 'Lead Pastor' },
  { title: 'Resource Impact', quote: '“Asking the questions about ‘thorns and thistles’ at work has brought people to tears, because it gave people permission to admit that work is suffering the effects of the fall and accept that it’s not because they aren’t good enough. Since hearing Matt ask that question, I’ve asked it to countless people, and it’s been a gift to them.”', name: 'Robert', role: 'Executive Pastor' },
  { title: 'Practicum Impact', quote: '“We’ve had more people come forward for prayer than ever before. It seems to be because our prayer ministry is starting to focus less on what is happening in the 90 minutes that people are in our building and more on the six days that people are living, relating, and working out in God’s world.”', name: 'Gary', role: 'Lead Pastor' },
  { title: 'Scatter Impact', quote: '“People generally do not make the connection between the work they do and God’s calling. Scatter helped us see that while we often highlight God’s calling on clergy, we need to help our congregants who are not pastors see that God has placed a calling on their lives.”', name: 'Laura', role: 'Senior Leader' },
];

export const faqs = [
  { q: 'Is there a cost to attend?', a: 'No. All lodging and meals are provided for our guests. You’ll simply be responsible for arranging your own travel to and from the event.' },
  { q: 'What airport should I fly into, and is transportation provided?', a: 'We recommend flying into Kansas City International Airport (MCI). Transportation to and from the hotel will be on your own.' },
  { q: 'Where should I park, and is valet available?', a: 'Made to Flourish will cover all parking costs for guests. Both valet and self-parking are available at The Crossroads Hotel Kansas City. Local guests will receive a parking voucher, and hotel guests will have parking conveniently added to their room.' },
  { q: 'Can I bring a spouse or guest?', a: 'Yes - we’d love for your spouse to join you. Please be sure to register them along with yourself so we can plan accordingly. If you’d like to bring an additional guest, please reach out to our team before registering so we can confirm availability.' },
  { q: 'What is the dress code?', a: 'Business casual attire is recommended for all sessions and gatherings.' },
  { q: 'Will there be an opportunity to give during the event?', a: 'This gathering is designed as a “come and see” experience. Our hope is that you’ll enjoy your time, build meaningful connections, and witness how God is working through Made to Flourish. There will be no formal ask or expectation to give - simply an invitation to experience the mission in action.' },
];
