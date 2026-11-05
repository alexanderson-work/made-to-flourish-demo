import { speakerPhotos } from './media';

// `focus`: where each photo is anchored when it's cropped (an object-position), from the 2026 site, so faces stay in
// frame. `card` is the speaker card, `modal` the bio popup; leave one out for the center.
export type Speaker = { id: string; name: string; title: string; photo: ImageMetadata; focus?: { card?: string; modal?: string }; bio: string[] };

const list: Omit<Speaker, 'photo'>[] = [
  {
    id: 'andy-crouch',
    focus: { card: '46.2% 9.8%' },
    name: 'Andy Crouch',
    title: 'Best-Selling Author & Speaker, Partner at Praxis',
    bio: [
      'Andy Crouch is partner for theology and culture at Praxis, a venture-building ecosystem advancing redemptive entrepreneurship. His writing and speaking explore themes of faith, technology, power, leadership, and the arts, offering thoughtful insight into the image of God and human flourishing in the modern world. Andy is the author of several influential books, including “The Life We’re Looking For,” “The Tech-Wise Family,” “Strong and Weak,” “Playing God,” and “Culture Making,” as well as a book co-authored with his daughter, Amy Crouch.',
      'With more than a decade of leadership at Christianity Today, where he served as executive editor, Andy has shaped conversations at the intersection of faith and culture. He also served as senior strategist for communication at the John Templeton Foundation. His work has appeared in The New York Times, The Wall Street Journal, and TIME magazine, and he has served in governance roles with InterVarsity Christian Fellowship, Fuller Theological Seminary, and the Council for Christian Colleges and Universities.',
      'Andy holds a degree in classics from Cornell University and an M.Div. summa cum laude from Boston University School of Theology. A classically trained musician, he is equally at home leading worship and engaging public audiences. He lives in Swarthmore, Pennsylvania, with his wife Catherine, and their family.',
    ],
  },
  {
    id: 'tom-nelson',
    focus: { card: '50.4% 0%', modal: '54.4% 9.8%' },
    name: 'Tom Nelson',
    title: 'Founder & Executive Chairman, Made to Flourish',
    bio: [
      'Tom Nelson is founder and executive chairman of Made to Flourish, a network that seeks to empower pastors to lead churches that produce human flourishing for the common good. He has also served as senior pastor of Christ Community Church in the Kansas City area for over 30 years. Tom is the author of Why Your Work Matters: How God Uses Our Everyday Vocations to Transform Us, Our Neighbors, and the World, Economics of Neighborly Love: Investing in Your Community’s Compassion and Capacity, and The Flourishing Pastor: Recovering the Lost Art of Shepherd Leadership.',
    ],
  },
  {
    id: 'matt-rusten',
    focus: { card: '49.4% 15.2%', modal: '48.4% 15%' },
    name: 'Matt Rusten',
    title: 'President, Made To Flourish',
    bio: [
      'Matt Rusten serves as the President for Made to Flourish. Rusten received his master of divinity degree from Trinity Evangelical Divinity School and his doctor of ministry in faith, work, economics, and vocation from Fuller Seminary. He has served in churches in North Dakota, the Chicago area, Kansas City, and Madison, Wisconsin. He and his wife, Margi, and their daughter, Olivia, and son, Owen, live in Kansas City.',
    ],
  },
  {
    id: 'chris-holly-justice',
    name: 'Chris and Holly Justice',
    title: 'Co-Founders, Engenious Design',
    bio: [
      'Together, Chris and Holly bring a unique combination of technical expertise, entrepreneurial leadership, and faith-driven purpose to their work. As co-founders of Engenious Design, they built a company known for its strong culture, collaborative teams, and commitment to excellence in medical device design and engineering. Since launching the firm in 2013, they have grown Engenious Design from a two-person startup into a multidisciplinary team of more than 78 professionals serving medical device companies nationwide. Chris serves as CEO and Principal, leading engineering strategy and innovation. Holly now serves as Executive Pastor at Christ Community, where she provides leadership and direction for the church’s mission, drawing on her background in design, leadership, and organizational development.',
    ],
  },
  {
    id: 'marcellus-casey',
    focus: { card: '48.7% 19.1%', modal: '48.5% 20.8%' },
    name: 'Marcellus Casey',
    title: 'Chaplain, Kansas City Chiefs',
    bio: [
      'Growing up with a father who pastored an inner-city church and who worked as a chaplain to Olympic and professional athletes gave Marcellus an inside look into sports ministry life. Having a mother who is a lifetime educator gave Marcellus a picture of what it means to slow down and care for others.',
      'Marcellus now has over 20 years of experience in sports ministry. After playing football and serving as the first ever football chaplain at Northwest Missouri State University, Marcellus married his high school sweetheart, Stephanie.',
      'He then served as the chaplain for the University of Illinois football and basketball teams through the Fellowship of Christian Athletes (F.C.A.) before moving to Kansas City to serve as F.C.A.’s Director for the states of Kansas and Missouri.',
      'In 2016, Marcellus moved his ministry focus to pastoring in the inner-city of Kansas City and eventually helped serve vulnerable families on the Eastside of KC through The Hope Center for 3 years. While working with The Hope Center Marcellus opened a successfully competitive boxing gym Crunch Time Boxing. The gym focuses on preparing high school athletes to compete through USA Boxing sanctioned bouts while also teaching them about Jesus and providing mentorship.',
      'Marcellus is currently serving in his 9th season as the chaplain for the Kansas City Chiefs.',
      'Marcellus and Stephanie recently celebrated 20 years of marriage, and they have three beautiful daughters (Salem, Cora, & Vivienne) and one handsome son (Ralphie).',
    ],
  },
  {
    id: 'thomas-kim',
    focus: { card: '51.8% 25.9%' },
    name: 'Thomas Kim',
    title: 'Founder & CEO, Everclean Car Wash',
    bio: [
      'Thomas Kim is an entrepreneur and investor focused on real estate and small businesses with high growth strategies. He is the Founder and CEO of Everclean Car Wash, a brand committed to making it easy to keep “your car always clean” while pursuing a broader mission to enrich lives through opportunity and holistic mentorship. Thomas and his wife, Evelyn, live in Dallas. They are parents to one daughter in heaven, one daughter on earth, and prior, Thomas raised three teenage foster sons. His hobbies include nearly any sport under the sun (except long-distance running), international travel, motorcycles, and high-fiber breakfasts.',
    ],
  },
  {
    id: 'stephen-bruner',
    focus: { card: '46.3% 14.5%', modal: '46.3% 30.2%' },
    name: 'Stephen Bruner',
    title: 'Co-Founder and former Co-CEO of Corkcicle',
    bio: [
      'Stephen Bruner is an entrepreneur and operator focused on building excellent products that expand categories while serving the common good. He is the Co-Founder and former Co-CEO of Corkcicle, where he helped grow the brand from its early days into a globally recognized consumer company. He is currently incubating a first-of-its-kind venture called HEIST, reimagining coffee for all hours through an uncompromising focus on exceptional decaf.',
      'Stephen graduated from the University of Georgia and later earned an M.A. in Biblical Studies from Reformed Theological Seminary. He lives in Orlando, Florida with his wife, Sarah, and their five children where they actively attend New City Church.',
    ],
  },
  {
    id: 'damein-schitter',
    focus: { card: '50% 22.5%', modal: '51.5% 21.7%' },
    name: 'Damein Schitter',
    title: 'Director for Faith, Work, and Culture at Reformed Theological Seminary',
    bio: [
      'Damein Schitter serves as the Director for Faith, Work, and Culture at Reformed Theological Seminary in Orlando. He previously served for 17 years in local church pastoral ministry across three states, including 14 years at NewCity Orlando —10 of those as Senior Pastor.',
      'Damein holds a PhD from Trinity Evangelical Divinity School, where his research focused on spiritual formation and the integration of faith and work. He is also the founder of the Redemptive Leaders’ Collective, an organization that helps Christian marketplace leaders cultivate vocational imagination by integrating faith, work, and calling.',
      'He is passionate about whole-life discipleship and vocationally healthy spirituality. Damein lives in Orlando with his wife, Leah, and their five children.',
    ],
  },
];

export const speakers: Speaker[] = list.map((s) => ({ ...s, photo: speakerPhotos[s.id] }));
