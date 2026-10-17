import { SubjectInfo, Badge } from '../types';

export const MAHARASHTRA_SSC_SUBJECTS: SubjectInfo[] = [
  {
    id: 'maths-1',
    name: 'Mathematics 1 (Algebra)',
    nameMr: 'गणित भाग १ (बीजगणित)',
    code: 'SSC-71',
    iconName: 'Calculator',
    color: 'from-blue-600 to-indigo-600',
    gradient: 'linear-gradient(135deg, #2563eb, #4f46e5)',
    totalMarks: 40,
    chapters: [
      {
        title: 'Linear Equations in Two Variables',
        titleMr: 'दोन चलांमधील रेषीय समीकरणे',
        weightageMarks: 12,
        keyTopics: ['Simultaneous Equations', 'Graphical Method', 'Cramer\'s Rule (Determinant)', 'Equations reducible to linear form']
      },
      {
        title: 'Quadratic Equations',
        titleMr: 'वर्गसमीकरणे',
        weightageMarks: 12,
        keyTopics: ['Factorization Method', 'Completing the Square', 'Formula Method', 'Nature of Roots (Discriminant Δ)', 'Relation between roots and coefficients']
      },
      {
        title: 'Arithmetic Progression (A.P.)',
        titleMr: 'अंकगणिती श्रेढी',
        weightageMarks: 8,
        keyTopics: ['General Term (tn = a + (n-1)d)', 'Sum of First n Terms (Sn)', 'Word Problems on A.P.']
      },
      {
        title: 'Financial Planning',
        titleMr: 'अर्थनियोजन',
        weightageMarks: 8,
        keyTopics: ['GST (CGST + SGST)', 'Tax Invoice & Input Tax Credit (ITC)', 'Shares, Face Value, Market Value', 'Mutual Funds, SIP']
      },
      {
        title: 'Probability',
        titleMr: 'संभाव्यता',
        weightageMarks: 8,
        keyTopics: ['Random Experiment', 'Sample Space S and n(S)', 'Events & Probability of an Event P(A) = n(A)/n(S)']
      },
      {
        title: 'Statistics',
        titleMr: 'सांख्यिकी',
        weightageMarks: 12,
        keyTopics: ['Mean (Direct, Assumed Mean, Step-Deviation)', 'Median and Mode', 'Pie Chart Representation & Interpretation', 'Histogram & Frequency Polygon']
      }
    ],
    formulaBook: [
      {
        name: 'Quadratic Formula (वर्गसमीकरण सूत्र)',
        formula: 'x = [-b ± √(b² - 4ac)] / (2a)',
        description: 'Used to find the roots of quadratic equation ax² + bx + c = 0.',
        chapter: 'Quadratic Equations'
      },
      {
        name: 'Discriminant (विवेचक Δ)',
        formula: 'Δ = b² - 4ac',
        description: 'Δ = 0: real & equal roots; Δ > 0: real & unequal; Δ < 0: not real.',
        chapter: 'Quadratic Equations'
      },
      {
        name: 'n-th Term of A.P. (सामान्य पद)',
        formula: 'tn = a + (n - 1)d',
        description: 'a = first term, d = common difference, n = term number.',
        chapter: 'Arithmetic Progression'
      },
      {
        name: 'Sum of n Terms of A.P.',
        formula: 'Sn = n/2 [2a + (n - 1)d]  or  Sn = n/2 [t1 + tn]',
        description: 'Finds total sum of terms in an Arithmetic Progression.',
        chapter: 'Arithmetic Progression'
      },
      {
        name: 'Cramer\'s Rule Determinants',
        formula: 'x = Dx / D,  y = Dy / D',
        description: 'Solves simultaneous equations using determinants.',
        chapter: 'Linear Equations'
      },
      {
        name: 'Probability Formula (संभाव्यता)',
        formula: 'P(A) = n(A) / n(S)',
        description: 'Number of favorable outcomes divided by total sample space.',
        chapter: 'Probability'
      }
    ]
  },
  {
    id: 'maths-2',
    name: 'Mathematics 2 (Geometry)',
    nameMr: 'गणित भाग २ (भूमिती)',
    code: 'SSC-71',
    iconName: 'Compass',
    color: 'from-purple-600 to-pink-600',
    gradient: 'linear-gradient(135deg, #9333ea, #db2777)',
    totalMarks: 40,
    chapters: [
      {
        title: 'Similarity',
        titleMr: 'समरूपता',
        weightageMarks: 10,
        keyTopics: ['Ratio of areas of two triangles', 'Basic Proportionality Theorem (BPT)', 'Converse of BPT', 'Angle Bisector Theorem', 'Tests of Similarity (AAA, SAS, SSS)']
      },
      {
        title: 'Pythagoras Theorem',
        titleMr: 'पायथागोरसचे प्रमेय',
        weightageMarks: 7,
        keyTopics: ['Pythagorean Triplet', 'Geometric Mean Theorem', 'Pythagoras Theorem Proof', 'Converse of Pythagoras', 'Apollonius Theorem']
      },
      {
        title: 'Circle',
        titleMr: 'वर्तुळ',
        weightageMarks: 12,
        keyTopics: ['Tangent Theorem & Tangent Segment Theorem', 'Touching Circles', 'Inscribed Angle Theorem', 'Cyclic Quadrilateral Theorem', 'Tangent-Secant Theorem']
      },
      {
        title: 'Geometric Constructions',
        titleMr: 'भौमितिक रचना',
        weightageMarks: 7,
        keyTopics: ['Construction of similar triangles', 'Tangent to a circle using center', 'Tangent to a circle without using center']
      },
      {
        title: 'Coordinate Geometry',
        titleMr: 'निर्देशांक भूमिती',
        weightageMarks: 7,
        keyTopics: ['Distance Formula', 'Section Formula', 'Midpoint Formula', 'Centroid Formula', 'Slope of a Line']
      },
      {
        title: 'Trigonometry',
        titleMr: 'त्रिकोणमिती',
        weightageMarks: 7,
        keyTopics: ['Trigonometric Ratios (sin, cos, tan, cot, sec, cosec)', 'Trigonometric Identities', 'Heights and Distances word problems']
      },
      {
        title: 'Mensuration',
        titleMr: 'महत्त्वमापन',
        weightageMarks: 10,
        keyTopics: ['Surface Area & Volume of Cylinder, Cone, Sphere, Hemisphere, Frustum', 'Area of Sector & Length of Arc']
      }
    ],
    formulaBook: [
      {
        name: 'Basic Proportionality Theorem (BPT)',
        formula: 'If DE || BC in ΔABC, then AD / DB = AE / EC',
        description: 'Crucial 3 or 4 marks board proof question.',
        chapter: 'Similarity'
      },
      {
        name: 'Pythagoras Theorem',
        formula: 'In right triangle: (Hypotenuse)² = (Side 1)² + (Side 2)²',
        description: 'Fundamental theorem of right-angled triangles.',
        chapter: 'Pythagoras Theorem'
      },
      {
        name: 'Geometric Mean Property',
        formula: 'BD² = AD × DC (where BD is altitude to hypotenuse AC)',
        description: 'Applied when altitude is drawn to hypotenuse in a right triangle.',
        chapter: 'Pythagoras Theorem'
      },
      {
        name: 'Distance Formula',
        formula: 'd = √[(x2 - x1)² + (y2 - y1)²]',
        description: 'Distance between two points (x1, y1) and (x2, y2).',
        chapter: 'Coordinate Geometry'
      },
      {
        name: 'Section Formula',
        formula: 'x = (mx2 + nx1)/(m + n),  y = (my2 + ny1)/(m + n)',
        description: 'Coordinates of point dividing line segment in ratio m : n.',
        chapter: 'Coordinate Geometry'
      },
      {
        name: 'Trigonometric Identities',
        formula: 'sin²θ + cos²θ = 1 | 1 + tan²θ = sec²θ | 1 + cot²θ = cosec²θ',
        description: 'Core identities used in trigonometric proofs.',
        chapter: 'Trigonometry'
      }
    ]
  },
  {
    id: 'science-1',
    name: 'Science & Technology 1',
    nameMr: 'विज्ञान आणि तंत्रज्ञान भाग १',
    code: 'SSC-72',
    iconName: 'Atom',
    color: 'from-cyan-600 to-blue-600',
    gradient: 'linear-gradient(135deg, #0891b2, #2563eb)',
    totalMarks: 40,
    chapters: [
      {
        title: 'Gravitation',
        titleMr: 'गुरुत्वाकर्षण',
        weightageMarks: 5,
        keyTopics: ['Kepler\'s Three Laws', 'Newton\'s Universal Law of Gravitation', 'Acceleration due to gravity (g) variations', 'Free Fall & Escape Velocity']
      },
      {
        title: 'Periodic Classification of Elements',
        titleMr: 'मूलद्रव्यांचे आवर्ती वर्गीकरण',
        weightageMarks: 6,
        keyTopics: ['Dobereiner\'s Triads', 'Newlands\' Octaves', 'Mendeleev\'s Periodic Table', 'Modern Periodic Table (Henry Moseley)', 'Periodic Trends: Valency, Atomic Radius, Metallic Character']
      },
      {
        title: 'Chemical Reactions and Equations',
        titleMr: 'रासायनिक अभिक्रिया आणि समीकरणे',
        weightageMarks: 6,
        keyTopics: ['Balancing chemical equations', 'Types: Combination, Decomposition, Displacement, Double Displacement', 'Oxidation & Reduction (Redox)', 'Corrosion & Rancidity']
      },
      {
        title: 'Effects of Electric Current',
        titleMr: 'विद्युतधारेचे परिणाम',
        weightageMarks: 7,
        keyTopics: ['Heating Effect of Electric Current (Joule\'s Law)', 'Magnetic Effect of Electric Current', 'Right-Hand Thumb Rule', 'Fleming\'s Left-Hand & Right-Hand Rule', 'Electric Motor & Electric Generator']
      },
      {
        title: 'Heat',
        titleMr: 'उष्णता',
        weightageMarks: 5,
        keyTopics: ['Latent Heat of Fusion & Vaporization', 'Anomalous Behavior of Water & Hope\'s Apparatus', 'Dew Point & Relative Humidity', 'Specific Heat Capacity (Q = mcΔT)']
      },
      {
        title: 'Refraction of Light',
        titleMr: 'प्रकाशाचे अपवर्तन',
        weightageMarks: 7,
        keyTopics: ['Laws of Refraction & Snell\'s Law', 'Refractive Index', 'Twinkling of Stars & Mirage', 'Dispersion of Light & Total Internal Reflection']
      },
      {
        title: 'Lenses',
        titleMr: 'भिंगे आणि त्यांचे उपयोग',
        weightageMarks: 6,
        keyTopics: ['Convex & Concave Lens Ray Diagrams', 'Lens Formula & Magnification', 'Power of Lens (P = 1/f)', 'Defects of Vision (Myopia, Hypermetropia, Presbyopia)']
      },
      {
        title: 'Metallurgy',
        titleMr: 'धातूविज्ञान',
        weightageMarks: 6,
        keyTopics: ['Physical & Chemical Properties of Metals/Non-metals', 'Reactivity Series', 'Concentration of Ores', 'Extraction of Aluminium (Bayer\'s & Hall-Heroult process)', 'Prevention of Corrosion']
      },
      {
        title: 'Carbon Compounds',
        titleMr: 'कर्बनी संयुगे',
        weightageMarks: 7,
        keyTopics: ['Covalent Bonds', 'Versatile nature of Carbon', 'Hydrocarbons (Alkanes, Alkenes, Alkynes)', 'Functional Groups & IUPAC Nomenclature', 'Ethanol & Ethanoic Acid']
      },
      {
        title: 'Space Missions',
        titleMr: 'अवकाश मोहिमा',
        weightageMarks: 5,
        keyTopics: ['Artificial Satellites and Orbits (LEO, MEO, HEO)', 'Satellite Launch Vehicles (PSLV)', 'Space Missions by ISRO']
      }
    ],
    definitionsAndLaws: [
      {
        title: 'Newton’s Universal Law of Gravitation',
        statement: 'Every object in the universe attracts every other object with a definite force. F = G (m1 × m2) / r²',
        importance: '5 Stars - Asked in 2-3 mark questions frequently.',
        chapter: 'Gravitation'
      },
      {
        title: 'Kepler\'s Three Laws of Planetary Motion',
        statement: '1. Orbit is an ellipse with Sun at one focus. 2. Line joining planet and Sun sweeps equal areas in equal intervals. 3. T² ∝ r³.',
        importance: 'High-Yield Board Question with diagram.',
        chapter: 'Gravitation'
      },
      {
        title: 'Snell’s Law of Refraction',
        statement: 'For a given pair of media, the ratio of sine of angle of incidence to sine of angle of refraction is constant: sin(i) / sin(r) = constant (n).',
        importance: 'Key Law in Optics section.',
        chapter: 'Refraction of Light'
      },
      {
        title: 'Fleming’s Left Hand Rule',
        statement: 'Stretch thumb, index finger, and middle finger mutually perpendicular. Index finger = magnetic field, middle finger = electric current, thumb = direction of motion/force.',
        importance: 'Principle behind Electric Motor.',
        chapter: 'Effects of Electric Current'
      },
      {
        title: 'Modern Periodic Law',
        statement: 'Properties of elements are a periodic function of their atomic numbers.',
        importance: 'Moseley’s discovery vs Mendeleev’s atomic mass.',
        chapter: 'Periodic Classification'
      }
    ]
  },
  {
    id: 'science-2',
    name: 'Science & Technology 2',
    nameMr: 'विज्ञान आणि तंत्रज्ञान भाग २',
    code: 'SSC-72',
    iconName: 'Dna',
    color: 'from-emerald-600 to-teal-600',
    gradient: 'linear-gradient(135deg, #059669, #0d9488)',
    totalMarks: 40,
    chapters: [
      {
        title: 'Heredity and Evolution',
        titleMr: 'आनुवंशिकता व उत्क्रांती',
        weightageMarks: 6,
        keyTopics: ['Transcription, Translation, Translocation', 'Evidences of Evolution (Morphological, Anatomical, Vestigial organs, Paleontological, Embryological)', 'Darwin\'s Theory of Natural Selection', 'Lamarckism & Speciation', 'Human Evolution']
      },
      {
        title: 'Life Processes in Living Organisms Part 1',
        titleMr: 'सजीवांतील जीवनप्रक्रिया भाग १',
        weightageMarks: 6,
        keyTopics: ['Cellular Respiration (Glycolysis, Krebs Cycle, ETC)', 'Energy from different food components', 'Cell Division: Mitosis & Meiosis stages']
      },
      {
        title: 'Life Processes in Living Organisms Part 2',
        titleMr: 'सजीवांतील जीवनप्रक्रिया भाग २',
        weightageMarks: 7,
        keyTopics: ['Asexual Reproduction (Binary Fission, Budding, Vegetative propagation)', 'Sexual Reproduction in Plants (Flower structure & Double fertilization)', 'Human Male & Female Reproductive Systems', 'Menstrual Cycle & Reproductive Health']
      },
      {
        title: 'Environmental Management',
        titleMr: 'पर्यावरणीय व्यवस्थापन',
        weightageMarks: 5,
        keyTopics: ['Ecosystem and Food Chain', 'Environmental Conservation', 'Biodiversity Hotspots & Sacred Groves', 'Classification of Threatened Species']
      },
      {
        title: 'Towards Green Energy',
        titleMr: 'हरित ऊर्जेच्या दिशेने',
        weightageMarks: 6,
        keyTopics: ['Thermal, Nuclear, and Hydroelectric Power Plants', 'Renewable Energy: Wind & Solar Photovoltaic Energy', 'Energy conversion flowcharts']
      },
      {
        title: 'Animal Classification',
        titleMr: 'प्राण्यांचे वर्गीकरण',
        weightageMarks: 7,
        keyTopics: ['Traditional vs New Classification (Robert Whittaker & Carl Woese)', 'Phylums: Porifera, Coelenterata, Platyhelminthes, Annelida, Arthropoda, Mollusca, Echinodermata, Chordata']
      },
      {
        title: 'Introduction to Microbiology',
        titleMr: 'ओळख सूक्ष्मजीवशास्त्राची',
        weightageMarks: 6,
        keyTopics: ['Applied Microbiology & Industrial Microbiology', 'Dairy Products, Probiotics, Bread & Cheese Production', 'Microbial Enzymes & Antibiotics', 'Microbes in Pollution Control']
      },
      {
        title: 'Cell Biology and Biotechnology',
        titleMr: 'पेशीविज्ञान आणि जैवतंत्रज्ञान',
        weightageMarks: 6,
        keyTopics: ['Stem Cells (Embryonic & Adult)', 'Organ Donation & Transplantation', 'Biotechnology applications: Agriculture (Bt Cotton), Medicine (Insulin), Gene Therapy', 'DNA Fingerprinting']
      },
      {
        title: 'Social Health & Disaster Management',
        titleMr: 'सामाजिक आरोग्य आणि आपत्ती व्यवस्थापन',
        weightageMarks: 6,
        keyTopics: ['Factors affecting social health & Cyber Crime', 'Stress Management', 'Disaster classification, First Aid, Mock Drills']
      }
    ],
    definitionsAndLaws: [
      {
        title: 'Vestigial Organs (अवशेषांगे)',
        statement: 'Degenerated or underdeveloped useless organs of organisms are called vestigial organs (e.g., Appendix, Wisdom teeth, Tailbone/Coccyx).',
        importance: 'Frequently asked 2-mark definition & examples.',
        chapter: 'Heredity and Evolution'
      },
      {
        title: 'Cellular Respiration ATP Yield',
        statement: 'Complete oxidation of one glucose molecule yields 38 ATP molecules through Glycolysis, Krebs Cycle (TCA), and Electron Transport Chain.',
        importance: 'Flowchart question in Q.3 or Q.4.',
        chapter: 'Life Processes 1'
      },
      {
        title: 'Stem Cells (मूलपेशी)',
        statement: 'Specialized undifferentiated parent cells from which all other specialized cells with dedicated functions are generated.',
        importance: 'High probability in Board exam short notes.',
        chapter: 'Biotechnology'
      }
    ]
  },
  {
    id: 'marathi',
    name: 'Marathi (Aksharbharati / Kumarbharati)',
    nameMr: 'मराठी (अक्षरभारती / कुमारभारती)',
    code: 'SSC-01',
    iconName: 'BookOpen',
    color: 'from-amber-600 to-orange-600',
    gradient: 'linear-gradient(135deg, #d97706, #ea580c)',
    totalMarks: 80,
    chapters: [
      {
        title: 'विभाग १: गद्य (Prose)',
        titleMr: 'गद्य विभाग',
        weightageMarks: 18,
        keyTopics: ['पठित गद्य परिच्छेद आकलन', 'अपठित गद्य परिच्छेद', 'स्वमत व अभिव्यक्ती प्रश्न']
      },
      {
        title: 'विभाग २: पद्य (Poetry)',
        titleMr: 'पद्य विभाग',
        weightageMarks: 16,
        keyTopics: ['पठित कविता आकलन', 'रसग्रहण (मध्यवर्ती कल्पना, शब्दांचा अर्थ, आवडण्याचे कारण)', 'काव्यसौंदर्य']
      },
      {
        title: 'विभाग ३: स्थूलवाचन (Rapid Reading)',
        titleMr: 'स्थूलवाचन',
        weightageMarks: 6,
        keyTopics: ['मनोहर विचार', 'उत्पत्ती कोश', 'मोठे होत असलेल्या मुलांनो']
      },
      {
        title: 'विभाग ४: भाषाभ्यास - व्याकरण घटकांवर आधारित (Grammar)',
        titleMr: 'भाषाभ्यास व व्याकरण',
        weightageMarks: 16,
        keyTopics: ['समास (अव्ययीभाव, तत्पुरुष, द्वंद्व, द्विगु)', 'वाक्यप्रकार व वाक्यरूपांतर', 'वाक्प्रचार (अर्थ व वाक्यात उपयोग)', 'शब्दसंपत्ती (समानार्थी, विरुद्धार्थी, शब्दसमूहाबद्दल एक शब्द)', 'लेखननियम व विरामचिन्हे']
      },
      {
        title: 'विभाग ५: उपयोजित लेखन (Writing Skills)',
        titleMr: 'उपयोजित लेखन',
        weightageMarks: 24,
        keyTopics: ['पत्रलेखन (औपचारिक/अनौपचारिक)', 'सारांश लेखन', 'जाहिरात लेखन', 'बातमी लेखन', 'कथा लेखन', 'निबंध लेखन (प्रसंगलेखन, आत्मकथन, वैचारिक)']
      }
    ],
    grammarRules: [
      {
        topic: 'समास (Samas)',
        rule: 'दोन किंवा अधिक शब्द एकत्र येऊन नवीन जोडशब्द तयार होण्याच्या प्रक्रियेस समास म्हणतात. दहावीसाठी महत्त्वाचे प्रकार:',
        examples: [
          'अव्ययीभाव समास: पहिले पद महत्त्वाचे (उदा. आजन्म, घरोघरी, प्रतिदिन)',
          'तत्पुरुष समास: दुसरे पद महत्त्वाचे (उदा. राजवाडा, सुखप्राप्त, सुखकर)',
          'द्वंद्व समास: दोन्ही पदे महत्त्वाची (उदा. आई-वडील, खरे-खोटे, भाजीपाला)',
          'द्विगु समास: पहिले पद संख्यावाचक (उदा. त्रिभुवन, नवरात्र, पंचवटी)'
        ]
      },
      {
        topic: 'वाक्यरूपांतर (Sentence Transformation)',
        rule: 'वाक्याचा अर्थ न बदलता एका प्रकारच्या वाक्याचे दुसऱ्या प्रकारच्या वाक्यात रूपांतर करणे.',
        examples: [
          'प्रश्नार्थीचे विधानार्थी: जगात सर्व सुखी कोण आहे? -> जगात सर्व सुखी कोणीही नाही.',
          'उद्गारार्थीचे विधानार्थी: केवढी भव्य इमारत ही! -> ही इमारत खूपच भव्य आहे.',
          'होकारार्थीचे नकारार्थी: तो वेळेवर आला. -> तो उशिरा आला नाही.'
        ]
      },
      {
        topic: 'वाक्प्रचार (Phrases & Idioms)',
        rule: 'शब्दांचा मूळ अर्थ न घेता एक विशिष्ट सांकेतिक अर्थ निघतो.',
        examples: [
          'कंठस्नान घालणे: ठार मारणे. (सैनिकांनी सीमेवर शत्रूला कंठस्नान घातले.)',
          'गगन भरारी घेणे: मोठी झेप घेणे/यश संपादन करणे.',
          'हातभार लावणे: मदत करणे.'
        ]
      }
    ]
  },
  {
    id: 'english',
    name: 'English (Kumarbharati)',
    nameMr: 'इंग्रजी (कुमारभारती)',
    code: 'SSC-03',
    iconName: 'Languages',
    color: 'from-rose-600 to-red-600',
    gradient: 'linear-gradient(135deg, #e11d48, #dc2626)',
    totalMarks: 80,
    chapters: [
      {
        title: 'Section 1: Language Study (Grammar & Vocabulary)',
        titleMr: 'लँग्वेज स्टडी (व्याकरण)',
        weightageMarks: 10,
        keyTopics: ['Compound words', 'Word chain', 'Alphabetical order', 'Direct-Indirect Speech', 'Degrees of Comparison', 'Clauses']
      },
      {
        title: 'Section 2: Textual Passages',
        titleMr: 'पाठ्यपुस्तकातील उतारे',
        weightageMarks: 20,
        keyTopics: ['Factual questions', 'Vocabulary', 'Grammar in context', 'Personal Response questions (2 marks each)']
      },
      {
        title: 'Section 3: Poetry Appreciation',
        titleMr: 'कविता व रसग्रहण',
        weightageMarks: 10,
        keyTopics: ['Comprehension of poem', 'Critical Appreciation (Title, Poet, Rhyme Scheme, Figures of Speech, Central Idea)']
      },
      {
        title: 'Section 4: Non-Textual Passage & Summary',
        titleMr: 'अपठित उतारा व सारांश',
        weightageMarks: 15,
        keyTopics: ['Unseen comprehension', 'One-third summary writing with suitable title']
      },
      {
        title: 'Section 5 & 6: Writing Skills & Creative Writing',
        titleMr: 'लेखन कौशल्य',
        weightageMarks: 25,
        keyTopics: ['Letter Writing (Formal/Informal)', 'Dialogue Writing / Drafting a Speech', 'Information Transfer (Non-verbal to Verbal & vice versa)', 'Expand the Theme / News Report', 'Story Writing']
      }
    ],
    grammarRules: [
      {
        topic: 'Figures of Speech for SSC Board',
        rule: 'Essential for Section 3 Poetry Appreciation (1 Mark)',
        examples: [
          'Simile: Direct comparison using "like" or "as" (e.g. As brave as a lion).',
          'Metaphor: Implied comparison without like/as (e.g. Life is a dream).',
          'Personification: Inanimate objects given human feelings (e.g. The wind whispered).',
          'Alliteration: Repetition of consonant sounds (e.g. She sells sea shells).'
        ]
      },
      {
        topic: 'Degrees of Comparison',
        rule: 'Interchange between Positive, Comparative, and Superlative without changing meaning.',
        examples: [
          'Positive: Very few cities in India are as big as Mumbai.',
          'Comparative: Mumbai is bigger than most other cities in India.',
          'Superlative: Mumbai is one of the biggest cities in India.'
        ]
      }
    ]
  },
  {
    id: 'history-geography',
    name: 'Social Sciences (History, Pol Sci & Geography)',
    nameMr: 'सामाजिक शास्त्रे (इतिहास, राज्यशास्त्र व भूगोल)',
    code: 'SSC-73',
    iconName: 'Globe',
    color: 'from-amber-700 to-emerald-700',
    gradient: 'linear-gradient(135deg, #b45309, #047857)',
    totalMarks: 80,
    chapters: [
      {
        title: 'History: Historiography Development in the West & India',
        titleMr: 'इतिहास: इतिहासलेखन पाश्चात्त्य व भारतीय परंपरा',
        weightageMarks: 8,
        keyTopics: ['Voltaire (Father of modern historiography)', 'Hegel, Karl Marx', 'James Mill, Grant Duff, V.D. Savarkar', 'Subaltern & Feminist Historiography']
      },
      {
        title: 'History: Applied History & Mass Media',
        titleMr: 'इतिहास: उपयोजित इतिहास व प्रसारमाध्यमे',
        weightageMarks: 8,
        keyTopics: ['UNESCO World Heritage Sites in India', 'Newspapers in India: Bengal Gazette, Darpan, Prabhakar, Kesari', 'Doordarshan & Akashvani']
      },
      {
        title: 'Political Science: Working of the Constitution & Election Process',
        titleMr: 'राज्यशास्त्र: संविधानाची वाटचाल व निवडणूक प्रक्रिया',
        weightageMarks: 8,
        keyTopics: ['Right to Information (RTI 2005)', 'Representation of Women in politics', 'Election Commission of India functions', 'EVM & VVPAT']
      },
      {
        title: 'Geography: Location, Extent & Physiography (India vs Brazil)',
        titleMr: 'भूगोल: स्थान, विस्तार व प्राकृतिक रचना (भारत आणि ब्राझील)',
        weightageMarks: 10,
        keyTopics: ['Latitudinal and longitudinal extent of India & Brazil', 'Himalayas, North Indian Plains, Peninsular Plateau', 'Guyana Highlands, Brazilian Highlands, Amazon Basin']
      },
      {
        title: 'Geography: Climate, Drainage & Natural Vegetation',
        titleMr: 'भूगोल: हवामान, जलप्रणाली आणि नैसर्गिक वनस्पती',
        weightageMarks: 12,
        keyTopics: ['Monsoon in India vs Pantanal / Equatorial Brazil', 'Ganga & Brahmaputra vs Amazon & Parana river basin', 'Rainforests of Brazil (Lungs of the World)']
      }
    ]
  }
];

export const STUDYVERSE_BADGES: Badge[] = [
  {
    id: 'first_question',
    name: 'Curious Explorer',
    nameMr: 'जिज्ञासू विद्यार्थी',
    description: 'Asked your first question to StudyVerse AI Tutor.',
    descriptionMr: 'StudyVerse AI कडे पहिला प्रश्न विचारला.',
    icon: 'Sparkles',
    category: 'general'
  },
  {
    id: 'first_quiz',
    name: 'Quiz Rookie',
    nameMr: 'क्विज नवशिका',
    description: 'Completed your first Maharashtra SSC practice quiz.',
    descriptionMr: 'पहिली महाराष्ट्र बोर्ड सराव परीक्षा पूर्ण केली.',
    icon: 'Award',
    category: 'quiz'
  },
  {
    id: 'quiz_master',
    name: 'Board Topper Mindset',
    nameMr: 'बोर्ड टॉपर वृत्ती',
    description: 'Scored 100% on any Class 10 chapter test.',
    descriptionMr: 'कोणत्याही पाठाच्या परीक्षेत १००% गुण मिळवले.',
    icon: 'Trophy',
    category: 'quiz'
  },
  {
    id: 'paper_scanner',
    name: 'Board Paper Decoder',
    nameMr: 'प्रश्नपत्रिका विश्लेषक',
    description: 'Scanned and extracted questions from a board question paper.',
    descriptionMr: 'बोर्डाची प्रश्नपत्रिका स्कॅन करून उत्तरे मिळवली.',
    icon: 'FileScan',
    category: 'paper'
  },
  {
    id: 'streak_3',
    name: 'Consistency Champion',
    nameMr: 'सातत्य विजेता',
    description: 'Maintained a 3-day active study streak.',
    descriptionMr: 'सलग ३ दिवस अभ्यासाचे सातत्य राखले.',
    icon: 'Flame',
    category: 'streak'
  },
  {
    id: 'math_ace',
    name: 'Algebra & Geometry Pro',
    nameMr: 'गणित तज्ज्ञ',
    description: 'Solved 10+ Mathematics questions with formulas.',
    descriptionMr: '१०+ गणिताचे प्रश्न सूत्रांसह अचूक सोडवले.',
    icon: 'Calculator',
    category: 'general'
  },
  {
    id: 'planner_guru',
    name: 'Master of Time',
    nameMr: 'वेळेचा व्यवस्थापक',
    description: 'Generated and completed daily tasks in the Study Planner.',
    descriptionMr: 'अभ्यास नियोजकातील सर्व दैनंदिन ध्येये पूर्ण केली.',
    icon: 'Clock',
    category: 'general'
  }
];

export const QUICK_PROMPTS = [
  {
    textEn: "What is the difference between mass and weight?",
    textMr: "वस्तुमान (Mass) आणि वजन (Weight) यातील फरक काय आहे?",
    subject: "Science 1"
  },
  {
    textEn: "Explain Newton’s second law with a formula.",
    textMr: "न्यूटनचा गतीविषयक दुसरा नियम सूत्रासह स्पष्ट करा.",
    subject: "Science 1"
  },
  {
    textEn: "Explain Pythagoras theorem in Marathi.",
    textMr: "पायथागोरसचे प्रमेय मराठीत सिद्धतेसह स्पष्ट करा.",
    subject: "Mathematics 2"
  },
  {
    textEn: "Explain 'समास' (Samas) and types with easy examples for Marathi paper.",
    textMr: "मराठी व्याकरणातील समास आणि त्याचे प्रकार सोप्या उदाहरणांसह सांगा.",
    subject: "Marathi"
  },
  {
    textEn: "How to balance chemical equations in Science 1 step by step?",
    textMr: "विज्ञान १ मधील रासायनिक समीकरणे पायरी-पायरीने कशी संतुलित करायची?",
    subject: "Science 1"
  }
];
