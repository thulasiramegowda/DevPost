export interface SeedProduct {
  id: string;
  url: string;
  name: string;
  imageUrl: string;
  store: string;
  averageRating: number;
  reviewCount: number;
  reviews: Array<{
    id: string;
    reviewerName: string;
    rating: number;
    comment: string;
    isVerifiedPurchase: boolean;
    reviewDate: string; // ISO date string
  }>;
}

export const SEED_PRODUCTS: SeedProduct[] = [
  // 1. High-trust product: boAt Rockerz 450 Bluetooth On-Ear Headphones
  {
    id: "prod_boat_450",
    url: "https://www.amazon.in/dp/B07PR1CL3S",
    name: "boAt Rockerz 450 Bluetooth On-Ear Headphones with Mic (Matte Black)",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    store: "Amazon India",
    averageRating: 4.2,
    reviewCount: 36,
    reviews: [
      {
        id: "rev_b450_01",
        reviewerName: "Rohan Deshmukh",
        rating: 4,
        comment: "Decent sound quality for the ₹1,299 price tag. Bass is punchy as expected from boAt. But ear pads get warm after 2 hours of Zoom meetings.",
        isVerifiedPurchase: true,
        reviewDate: "2024-03-12T10:15:00Z"
      },
      {
        id: "rev_b450_02",
        reviewerName: "Sneha Sen",
        rating: 5,
        comment: "Battery backup is fantastic! Used it for almost 4 days during daily commute to office in Bangalore metro without charging.",
        isVerifiedPurchase: true,
        reviewDate: "2024-03-19T14:22:00Z"
      },
      {
        id: "rev_b450_03",
        reviewerName: "Karthik Subramanian",
        rating: 3,
        comment: "Average microphone quality. My colleagues complained about background traffic noise during daily standup calls. Music is fine though.",
        isVerifiedPurchase: true,
        reviewDate: "2024-04-02T09:40:00Z"
      },
      {
        id: "rev_b450_04",
        reviewerName: "Pooja Hegde",
        rating: 5,
        comment: "Value for money. Lightweight design and connects quickly with both my laptop and Android phone. Very happy with purchase.",
        isVerifiedPurchase: true,
        reviewDate: "2024-04-18T16:05:00Z"
      },
      {
        id: "rev_b450_05",
        reviewerName: "Arjun Mehta",
        rating: 2,
        comment: "The plastic frame near the adjustable headband cracked after 4 months of normal handling. Service center asked me to courier it to Mumbai.",
        isVerifiedPurchase: true,
        reviewDate: "2024-05-05T11:30:00Z"
      },
      {
        id: "rev_b450_06",
        reviewerName: "Meera Krishnan",
        rating: 4,
        comment: "Bought during Amazon Great Summer Sale. Battery life easily lasts 14-15 hours on medium volume. Sound clarity is crisp.",
        isVerifiedPurchase: true,
        reviewDate: "2024-05-22T08:12:00Z"
      },
      {
        id: "rev_b450_07",
        reviewerName: "Vikram Rathore",
        rating: 5,
        comment: "Crisp highs and deep lows. Cushion is soft enough. Charges fully in about 2 hours with standard Type-C cable.",
        isVerifiedPurchase: true,
        reviewDate: "2024-06-03T18:45:00Z"
      },
      {
        id: "rev_b450_08",
        reviewerName: "Deepak Sharma",
        rating: 4,
        comment: "Good on-ear headphones for students. Bluetooth range easily reaches 8 to 10 meters across two rooms.",
        isVerifiedPurchase: true,
        reviewDate: "2024-06-19T12:00:00Z"
      },
      {
        id: "rev_b450_09",
        reviewerName: "Ananya Roy",
        rating: 1,
        comment: "Left ear cup stopped working completely within 3 weeks. Initiated replacement through Amazon customer care smoothly.",
        isVerifiedPurchase: true,
        reviewDate: "2024-07-02T15:20:00Z"
      },
      {
        id: "rev_b450_10",
        reviewerName: "Gaurav Malhotra",
        rating: 4,
        comment: "Comfortable for gym sessions, stays in place while doing bench press and jogging on treadmill.",
        isVerifiedPurchase: false,
        reviewDate: "2024-07-14T19:10:00Z"
      },
      {
        id: "rev_b450_11",
        reviewerName: "Nisha Agarwal",
        rating: 5,
        comment: "Gifted this to my younger brother for his online college classes. He loves the matte black finish and bass.",
        isVerifiedPurchase: true,
        reviewDate: "2024-07-28T13:45:00Z"
      },
      {
        id: "rev_b450_12",
        reviewerName: "Tanmay Joshi",
        rating: 3,
        comment: "Sound is bass-heavy. If you listen to classical music or podcasts, vocals can sound slightly muffled. Equalizer tweak required.",
        isVerifiedPurchase: true,
        reviewDate: "2024-08-08T10:05:00Z"
      },
      {
        id: "rev_b450_13",
        reviewerName: "Harish Pillai",
        rating: 5,
        comment: "Solid build quality for under 1500 rupees. Volume buttons have tactile click feedback.",
        isVerifiedPurchase: true,
        reviewDate: "2024-08-18T17:35:00Z"
      },
      {
        id: "rev_b450_14",
        reviewerName: "Divya Nambiar",
        rating: 4,
        comment: "Good product. The foldable design makes it compact to carry in a backpack. Aux cable option is a lifesaver when battery dies.",
        isVerifiedPurchase: true,
        reviewDate: "2024-08-29T11:15:00Z"
      },
      {
        id: "rev_b450_15",
        reviewerName: "Siddharth Jain",
        rating: 5,
        comment: "Using for 6 months now. Still holds battery charge for 12+ hours. Great purchase for daily commute.",
        isVerifiedPurchase: true,
        reviewDate: "2024-09-07T14:50:00Z"
      },
      {
        id: "rev_b450_16",
        reviewerName: "Farhan Qureshi",
        rating: 4,
        comment: "Packaging was neat and delivery was within 24 hours via Amazon Prime. Bass is truly impressive at this price segment.",
        isVerifiedPurchase: true,
        reviewDate: "2024-09-15T09:25:00Z"
      },
      {
        id: "rev_b450_17",
        reviewerName: "Priyanka Patel",
        rating: 3,
        comment: "Tight clamping force on glasses frame. Gives mild headache if worn continuously for more than 90 minutes.",
        isVerifiedPurchase: true,
        reviewDate: "2024-09-24T16:40:00Z"
      },
      {
        id: "rev_b450_18",
        reviewerName: "Manoj Verma",
        rating: 5,
        comment: "Bass lovers will definitely enjoy this. Tried EDMs and Punjabi beats, vocals and percussion remain distinct.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-02T13:10:00Z"
      },
      {
        id: "rev_b450_19",
        reviewerName: "Sunita Chatterjee",
        rating: 4,
        comment: "Daughter uses it for listening to audiobooks. Sound level is well regulated and not shrill.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-10T11:20:00Z"
      },
      {
        id: "rev_b450_20",
        reviewerName: "Aditya Nair",
        rating: 2,
        comment: "Microphone captures too much surrounding noise in open offices. Had to switch back to wired earphone for calls.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-14T08:35:00Z"
      },
      {
        id: "rev_b450_21",
        reviewerName: "Rashmi Kulkarni",
        rating: 5,
        comment: "Compact, durable, and good looking. Ear cushions are soft. Battery easily exceeds claim.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-17T15:05:00Z"
      },
      {
        id: "rev_b450_22",
        reviewerName: "Kunal Bansal",
        rating: 4,
        comment: "Satisfied with performance. No audio delay noticed while watching Netflix movies and YouTube videos.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-19T17:15:00Z"
      },
      {
        id: "rev_b450_23",
        reviewerName: "Laxman Rao",
        rating: 4,
        comment: "Authentic boAt product verified via QR code inside the box. Genuine dealer delivery.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-20T12:00:00Z"
      },
      {
        id: "rev_b450_24",
        reviewerName: "Swati Tiwari",
        rating: 5,
        comment: "Very nice headphones, color looks classy in matte black. Buttons are easy to navigate without looking.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-21T18:25:00Z"
      },
      {
        id: "rev_b450_25",
        reviewerName: "Aakash Gupta",
        rating: 3,
        comment: "Audio is decent but latency is high for competitive gaming like BGMI or Valorant. Stick to casual music.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-22T10:30:00Z"
      },
      {
        id: "rev_b450_26",
        reviewerName: "Bhavna Chawla",
        rating: 5,
        comment: "Value for money product. Battery life is extraordinary and charges fast.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-23T14:10:00Z"
      },
      {
        id: "rev_b450_27",
        reviewerName: "Rajeev Menon",
        rating: 4,
        comment: "Decent build. Ear cups rotate nicely. Bass is strong without distortion at 75% volume.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-23T19:40:00Z"
      },
      {
        id: "rev_b450_28",
        reviewerName: "Kavita Singhal",
        rating: 4,
        comment: "Good product. Using during evening walks, doesn't fall off even when jogging.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-24T09:15:00Z"
      },
      {
        id: "rev_b450_29",
        reviewerName: "Nitin Saxena",
        rating: 5,
        comment: "Completely satisfied. Premium look at budget pricing. Voice prompts when connected are helpful.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-24T13:20:00Z"
      },
      {
        id: "rev_b450_30",
        reviewerName: "Shruti Das",
        rating: 1,
        comment: "Received a box with torn seal and missing aux cable. Returned immediately for refund.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-24T16:50:00Z"
      },
      {
        id: "rev_b450_31",
        reviewerName: "Venkatesh Prasad",
        rating: 5,
        comment: "Sturdy hinges, good sound isolation from ceiling fan noise. Excellent for work study.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-24T20:10:00Z"
      },
      {
        id: "rev_b450_32",
        reviewerName: "Ashwin Bhatt",
        rating: 4,
        comment: "Good frequency response. Bass is punchy and treble is not harsh.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-25T08:00:00Z"
      },
      {
        id: "rev_b450_33",
        reviewerName: "Madhuri Dixit",
        rating: 4,
        comment: "Comfortable cushion. Connecting to iPad and Android phone works without any stutter.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-25T11:45:00Z"
      },
      {
        id: "rev_b450_34",
        reviewerName: "Varun Reddy",
        rating: 5,
        comment: "Best on-ear headphone under 1.5k. Have gifted 2 more to cousins.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-25T14:30:00Z"
      },
      {
        id: "rev_b450_35",
        reviewerName: "Sanjay Dutta",
        rating: 4,
        comment: "Clear sound during calls inside room. Battery lasts throughout the week.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-25T17:10:00Z"
      },
      {
        id: "rev_b450_36",
        reviewerName: "Alka Sen",
        rating: 4,
        comment: "Lightweight and easy to carry. Genuine boAt bass and clean vocals.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-25T19:00:00Z"
      }
    ]
  },

  // 2. Moderate-trust product: Prestige Iris 750W Mixer Grinder
  {
    id: "prod_prestige_iris",
    url: "https://www.flipkart.com/prestige-iris-750-w-mixer-grinder/p/itm1234567",
    name: "Prestige Iris 750W Mixer Grinder with 3 Stainless Steel Jars and 1 Juicer Jar (White/Blue)",
    imageUrl: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80",
    store: "Flipkart",
    averageRating: 4.1,
    reviewCount: 34,
    reviews: [
      {
        id: "rev_iris_01",
        reviewerName: "Suma Sundaram",
        rating: 4,
        comment: "Grinds dosa and idli batter smoothly. Powerful 750W motor makes wet grinding quick. But please note initial burning smell is there for first 2-3 runs.",
        isVerifiedPurchase: true,
        reviewDate: "2024-02-14T09:30:00Z"
      },
      {
        id: "rev_iris_02",
        reviewerName: "Balaji V",
        rating: 3,
        comment: "Motor power is strong but the small chutney jar lid rubber gasket is loose and liquid leaks if filled beyond half level.",
        isVerifiedPurchase: true,
        reviewDate: "2024-02-28T14:15:00Z"
      },
      {
        id: "rev_iris_03",
        reviewerName: "Hemalatha R",
        rating: 5,
        comment: "Prestige brand reliability. Stainless steel jars have thick gauge and blades are razor sharp. Dry masala grinding is flawless.",
        isVerifiedPurchase: true,
        reviewDate: "2024-03-10T11:45:00Z"
      },
      {
        id: "rev_iris_04",
        reviewerName: "Ramesh Babu",
        rating: 2,
        comment: "Very loud noise level. Sounds like a mini aircraft inside apartment kitchen. Overload button trips even with moderate ginger garlic paste load.",
        isVerifiedPurchase: true,
        reviewDate: "2024-03-24T16:00:00Z"
      },
      {
        id: "rev_iris_05",
        reviewerName: "Rekha Sharma",
        rating: 4,
        comment: "Good mixer for daily household cooking. Transparent juicer jar with pulp extractor is very useful for sweet lime and pomegranate juice.",
        isVerifiedPurchase: true,
        reviewDate: "2024-04-05T10:20:00Z"
      },
      {
        id: "rev_iris_06",
        reviewerName: "Vinod Chandran",
        rating: 4,
        comment: "Initial burning smell scared me, but manual says it is motor varnish evaporation. After 3 uses smell disappeared completely.",
        isVerifiedPurchase: true,
        reviewDate: "2024-04-18T13:40:00Z"
      },
      {
        id: "rev_iris_07",
        reviewerName: "Kalyani Deshpande",
        rating: 3,
        comment: "Chutney jar lid lock broke within two months. Flipkart customer support told to contact Prestige authorized center in Pune.",
        isVerifiedPurchase: true,
        reviewDate: "2024-05-02T15:10:00Z"
      },
      {
        id: "rev_iris_08",
        reviewerName: "Girish K",
        rating: 5,
        comment: "Heavy duty motor. Ground turmeric and hard dry spices into fine powder in 2 minutes. Sturdy rubber feet prevent slipping on granite slab.",
        isVerifiedPurchase: true,
        reviewDate: "2024-05-15T09:05:00Z"
      },
      {
        id: "rev_iris_09",
        reviewerName: "Archana Goswami",
        rating: 4,
        comment: "Decent mixer grinder. Easy to wash jars. Blue and white combination looks clean and modern.",
        isVerifiedPurchase: false,
        reviewDate: "2024-05-29T12:30:00Z"
      },
      {
        id: "rev_iris_10",
        reviewerName: "Satish Patil",
        rating: 2,
        comment: "Plastic coupler at base started eroding after grinding dry coriander seeds. Expected better coupler durability from Prestige.",
        isVerifiedPurchase: true,
        reviewDate: "2024-06-12T17:25:00Z"
      },
      {
        id: "rev_iris_11",
        reviewerName: "Geeta Venkatesh",
        rating: 5,
        comment: "My mother has been using Prestige for 20 years. This new Iris 750w model is lightweight yet grinds tough batters with ease.",
        isVerifiedPurchase: true,
        reviewDate: "2024-06-25T11:15:00Z"
      },
      {
        id: "rev_iris_12",
        reviewerName: "Muralidharan S",
        rating: 4,
        comment: "Does the job well. Overload reset switch located at bottom is easy to press if it ever trips.",
        isVerifiedPurchase: true,
        reviewDate: "2024-07-08T14:50:00Z"
      },
      {
        id: "rev_iris_13",
        reviewerName: "Latha Mani",
        rating: 3,
        comment: "The motor gets noticeably warm after 3 minutes continuous run. You must pause in between pulses for heavy loads.",
        isVerifiedPurchase: true,
        reviewDate: "2024-07-22T08:40:00Z"
      },
      {
        id: "rev_iris_14",
        reviewerName: "Arun Prasad",
        rating: 5,
        comment: "Super fast grinding! 3 speed rotary control works nicely with whip function. Delivery arrived 2 days ahead of schedule.",
        isVerifiedPurchase: true,
        reviewDate: "2024-08-05T16:15:00Z"
      },
      {
        id: "rev_iris_15",
        reviewerName: "Nandini Ghosh",
        rating: 4,
        comment: "Good machine. Juicer sieve is fine and separates seeds properly when making tomato puree.",
        isVerifiedPurchase: false,
        reviewDate: "2024-08-19T10:00:00Z"
      },
      {
        id: "rev_iris_16",
        reviewerName: "Praveen Tiwari",
        rating: 1,
        comment: "Jar handle cracked while lifting sambar masala. Poor quality plastic used on jar handles.",
        isVerifiedPurchase: true,
        reviewDate: "2024-09-02T13:45:00Z"
      },
      {
        id: "rev_iris_17",
        reviewerName: "Sujata Mahajan",
        rating: 5,
        comment: "Very satisfied with grinding performance. Jars click securely into place before turning switch on.",
        isVerifiedPurchase: true,
        reviewDate: "2024-09-12T15:20:00Z"
      },
      {
        id: "rev_iris_18",
        reviewerName: "Ashok Shenoy",
        rating: 4,
        comment: "Reliable kitchen workhorse. Handles daily coconut scraping and chutney making without hassle.",
        isVerifiedPurchase: true,
        reviewDate: "2024-09-20T09:10:00Z"
      },
      {
        id: "rev_iris_19",
        reviewerName: "Meenakshi Sundaram",
        rating: 3,
        comment: "Gasket smell took a few washes with warm lemon water to disappear. Grinding performance is good though.",
        isVerifiedPurchase: false,
        reviewDate: "2024-09-28T18:30:00Z"
      },
      {
        id: "rev_iris_20",
        reviewerName: "Ajay Srivastava",
        rating: 4,
        comment: "Solid copper motor. A bit loud on level 3 speed, but for 750 Watts that is expected.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-04T11:05:00Z"
      },
      {
        id: "rev_iris_21",
        reviewerName: "Padma Radhakrishnan",
        rating: 5,
        comment: "Best mixer under ₹3000 during Big Billion Days. Compact size saves kitchen counter space.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-09T14:40:00Z"
      },
      {
        id: "rev_iris_22",
        reviewerName: "Suresh Pillai",
        rating: 4,
        comment: "Good build quality. Jars don't rust even with daily washing. Recommended for small to medium families.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-13T17:15:00Z"
      },
      {
        id: "rev_iris_23",
        reviewerName: "Usha Natarajan",
        rating: 4,
        comment: "Grinds urad dal into fluffy batter with very little water. Good torque.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-16T10:50:00Z"
      },
      {
        id: "rev_iris_24",
        reviewerName: "Deepak Soni",
        rating: 3,
        comment: "Decent product. Wire length is slightly short at 1 meter, need extension cord if plug point is high.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-18T13:20:00Z"
      },
      {
        id: "rev_iris_25",
        reviewerName: "Bhavani Shankar",
        rating: 5,
        comment: "Quick delivery and genuine warranty card included. Prestige service is readily available across South India.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-20T16:00:00Z"
      },
      {
        id: "rev_iris_26",
        reviewerName: "Naveen Choudhary",
        rating: 4,
        comment: "Blades are sharp and jar locks are firm. Smooth operation.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-21T09:30:00Z"
      },
      {
        id: "rev_iris_27",
        reviewerName: "Shobha Rani",
        rating: 4,
        comment: "All 4 jars are useful. Wet grinding jar takes 1 kg batter easily.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-22T12:10:00Z"
      },
      {
        id: "rev_iris_28",
        reviewerName: "Manoj Kulkarni",
        rating: 2,
        comment: "Burning smell occurred on first day. Prestige executive visited and replaced carbon brush under warranty.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-22T15:40:00Z"
      },
      {
        id: "rev_iris_29",
        reviewerName: "Chitra Iyer",
        rating: 5,
        comment: "Very efficient for South Indian cooking recipes. Sambar powders come out very fine.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-23T11:20:00Z"
      },
      {
        id: "rev_iris_30",
        reviewerName: "Vikas Aggarwal",
        rating: 4,
        comment: "Value for money mixer. Jars feel substantial in hand.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-23T18:05:00Z"
      },
      {
        id: "rev_iris_31",
        reviewerName: "Radha Krishnan",
        rating: 4,
        comment: "Good machine. Grinds smoothly without excessive vibration on counter.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-24T08:50:00Z"
      },
      {
        id: "rev_iris_32",
        reviewerName: "Prakash Hegde",
        rating: 3,
        comment: "Lid rubber ring requires careful alignment otherwise paste spills on motor top.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-24T14:15:00Z"
      },
      {
        id: "rev_iris_33",
        reviewerName: "Anandi Das",
        rating: 5,
        comment: "Does what it says. Happy with the purchase. Motor has great power.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-25T10:00:00Z"
      },
      {
        id: "rev_iris_34",
        reviewerName: "Kishore Kumar",
        rating: 4,
        comment: "Nice product, sturdy stainless steel jars. Delivered in safe packaging.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-25T16:30:00Z"
      }
    ]
  },

  // 3. Low-trust product: TurboPower 65W GaN Dual-Port Fast Charger
  {
    id: "prod_turbopower_65w",
    url: "https://www.amazon.in/dp/B09XYZ65W1",
    name: "TurboPower 65W GaN Dual-Port Fast Charger (Type-C + USB-A) for Laptops & Phones",
    imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80",
    store: "Amazon India",
    averageRating: 4.6,
    reviewCount: 38,
    reviews: [
      {
        id: "rev_tp_01",
        reviewerName: "Rakesh Sharma",
        rating: 5,
        comment: "Super fast charging, must buy for iPhone! Best quality ever.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-10T02:15:00Z"
      },
      {
        id: "rev_tp_02",
        reviewerName: "Aman Gupta",
        rating: 5,
        comment: "Super fast charging, must buy for iPhone! Highly recommended product.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-10T02:40:00Z"
      },
      {
        id: "rev_tp_03",
        reviewerName: "Pooja Verma",
        rating: 5,
        comment: "Super fast charging, must buy for iPhone! Charges very fast and does not heat up.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-10T03:10:00Z"
      },
      {
        id: "rev_tp_04",
        reviewerName: "Vikram Malhotra",
        rating: 5,
        comment: "Super fast charging, must buy for iPhone! Superb product at cheap rate.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-10T03:55:00Z"
      },
      {
        id: "rev_tp_05",
        reviewerName: "Sanjay Singhal",
        rating: 5,
        comment: "Very good charger charges fast, highly recommended. Works like magic.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-10T05:20:00Z"
      },
      {
        id: "rev_tp_06",
        reviewerName: "Neha Tiwari",
        rating: 5,
        comment: "Very good charger charges fast, highly recommended. Nice color and build.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-10T06:45:00Z"
      },
      {
        id: "rev_tp_07",
        reviewerName: "Kunal Mehra",
        rating: 5,
        comment: "Very good charger charges fast, highly recommended. Must buy for everyone.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-10T08:15:00Z"
      },
      {
        id: "rev_tp_08",
        reviewerName: "Deepak Rawat",
        rating: 5,
        comment: "Must buy product super quality fast charge. Charges my phone in 25 mins.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-10T09:30:00Z"
      },
      {
        id: "rev_tp_09",
        reviewerName: "Anil Sethi",
        rating: 5,
        comment: "Must buy product super quality fast charge. Best charger on Amazon.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-10T11:00:00Z"
      },
      {
        id: "rev_tp_10",
        reviewerName: "Sunil Bajaj",
        rating: 5,
        comment: "Must buy product super quality fast charge. Awesome build and fast delivery.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-10T12:20:00Z"
      },
      {
        id: "rev_tp_11",
        reviewerName: "Pritam Roy",
        rating: 5,
        comment: "Super fast charging, must buy for iPhone! Premium quality charger.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-11T01:30:00Z"
      },
      {
        id: "rev_tp_12",
        reviewerName: "Rohit Agarwal",
        rating: 5,
        comment: "Super fast charging, must buy for iPhone! Best GaN technology.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-11T02:10:00Z"
      },
      {
        id: "rev_tp_13",
        reviewerName: "Alok Srivastava",
        rating: 5,
        comment: "Very good charger charges fast, highly recommended. 5 stars from my side.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-11T04:45:00Z"
      },
      {
        id: "rev_tp_14",
        reviewerName: "Gautam Kapoor",
        rating: 5,
        comment: "Must buy product super quality fast charge. Genuine gadget.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-11T06:20:00Z"
      },
      {
        id: "rev_tp_15",
        reviewerName: "Sachin Kulkarni",
        rating: 5,
        comment: "Super fast charging, must buy for iPhone! Charges MacBook and phone together.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-11T08:50:00Z"
      },
      {
        id: "rev_tp_16",
        reviewerName: "Mohit Jain",
        rating: 5,
        comment: "Very good charger charges fast, highly recommended. GaN charger is compact.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-11T11:15:00Z"
      },
      {
        id: "rev_tp_17",
        reviewerName: "Vimal Shah",
        rating: 5,
        comment: "Must buy product super quality fast charge. Don't think twice just buy.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-11T13:40:00Z"
      },
      {
        id: "rev_tp_18",
        reviewerName: "Dinesh Parekh",
        rating: 5,
        comment: "Super fast charging, must buy for iPhone! Excellent purchase experience.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-11T15:00:00Z"
      },
      {
        id: "rev_tp_19",
        reviewerName: "Kunal Ghosh",
        rating: 1,
        comment: "DO NOT BUY! This charger gets extremely hot to touch within 15 minutes of connecting my Dell XPS laptop. Burning plastic odor started coming.",
        isVerifiedPurchase: true,
        reviewDate: "2024-08-14T10:20:00Z"
      },
      {
        id: "rev_tp_20",
        reviewerName: "Abhishek Mukherjee",
        rating: 1,
        comment: "Fake claims. Tested with USB power meter. Type-C port negotiates max 27W on PD protocol, nowhere near advertised 65W. Dangerous heating.",
        isVerifiedPurchase: true,
        reviewDate: "2024-09-02T15:35:00Z"
      },
      {
        id: "rev_tp_21",
        reviewerName: "Dr. Arvind Rao",
        rating: 2,
        comment: "Sparking observed in wall socket when plugging in. Tripped MCB once. Stopped using it out of safety concerns for my phone battery.",
        isVerifiedPurchase: true,
        reviewDate: "2024-09-18T18:00:00Z"
      },
      {
        id: "rev_tp_22",
        reviewerName: "Tanvi S",
        rating: 1,
        comment: "Died completely on day 12. No response when plugging in any cable. Seller ignored replacement email request.",
        isVerifiedPurchase: true,
        reviewDate: "2024-09-29T11:40:00Z"
      },
      {
        id: "rev_tp_23",
        reviewerName: "Harshit Singhal",
        rating: 4,
        comment: "Charges Samsung Galaxy S23 at Super Fast Charging rate. Slightly warm but acceptable for compact size.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-01T14:15:00Z"
      },
      {
        id: "rev_tp_24",
        reviewerName: "Rahul Dravid",
        rating: 5,
        comment: "Good fast charger. Fits in pocket easily.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-14T09:20:00Z"
      },
      {
        id: "rev_tp_25",
        reviewerName: "Devendra Patil",
        rating: 5,
        comment: "Charges both ports simultaneously without issue. Satisfied.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-16T12:05:00Z"
      },
      {
        id: "rev_tp_26",
        reviewerName: "Prateek Saxena",
        rating: 5,
        comment: "Best charger on Amazon. Charges laptop and mobile together fast.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T16:30:00Z"
      },
      {
        id: "rev_tp_27",
        reviewerName: "Monika Sharma",
        rating: 5,
        comment: "Nice adapter. Compact and white matte finish is elegant.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-19T10:15:00Z"
      },
      {
        id: "rev_tp_28",
        reviewerName: "Siddhesh Mane",
        rating: 5,
        comment: "Very good product. Super fast charging rate on my OnePlus phone.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-20T14:40:00Z"
      },
      {
        id: "rev_tp_29",
        reviewerName: "Rakesh Sharma",
        rating: 5,
        comment: "Super fast charging, must buy for iPhone! Ordered second piece for office.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-21T08:10:00Z"
      },
      {
        id: "rev_tp_30",
        reviewerName: "Varun Goel",
        rating: 1,
        comment: "Look at the suspicious reviews all posted on October 10th with same wording! This charger is cheaply rebadged OEM and disconnects every 2 minutes.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-21T19:50:00Z"
      },
      {
        id: "rev_tp_31",
        reviewerName: "Aman Gupta",
        rating: 5,
        comment: "Super fast charging, must buy for iPhone! Best item.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-22T04:20:00Z"
      },
      {
        id: "rev_tp_32",
        reviewerName: "Nitin Rastogi",
        rating: 5,
        comment: "Very good charger charges fast, highly recommended.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-22T09:00:00Z"
      },
      {
        id: "rev_tp_33",
        reviewerName: "Shashank Joshi",
        rating: 2,
        comment: "Only 1 port outputs power when 2 devices are plugged in. False wattage distribution claims.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-23T11:35:00Z"
      },
      {
        id: "rev_tp_34",
        reviewerName: "Kartik Chander",
        rating: 5,
        comment: "Must buy product super quality fast charge. Works fine.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-23T15:10:00Z"
      },
      {
        id: "rev_tp_35",
        reviewerName: "Ritu Namboodiri",
        rating: 5,
        comment: "Very fast charging on iPad Air. No issue so far.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-24T10:40:00Z"
      },
      {
        id: "rev_tp_36",
        reviewerName: "Pooja Verma",
        rating: 5,
        comment: "Super fast charging, must buy for iPhone! Great charger.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-24T18:25:00Z"
      },
      {
        id: "rev_tp_37",
        reviewerName: "Gaurav Sengar",
        rating: 1,
        comment: "Both pins on plug got loose and came out inside wall socket. Poor plastic quality.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-25T09:15:00Z"
      },
      {
        id: "rev_tp_38",
        reviewerName: "Vijay Keshari",
        rating: 5,
        comment: "Very good charger charges fast, highly recommended. 5 stars.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-25T14:00:00Z"
      }
    ]
  },

  // 4. Very-low-trust product: SlimGlow Herbal Detox Slimming Tea 28-Day Pack
  {
    id: "prod_slimglow_tea",
    url: "https://www.meesho.com/slimglow-herbal-detox-tea/p/sg9981",
    name: "SlimGlow Herbal Ayurvedic Detox Slimming Green Tea (28-Day Pack, 56 Bags)",
    imageUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop&q=80",
    store: "Meesho",
    averageRating: 4.9,
    reviewCount: 40,
    reviews: [
      {
        id: "rev_sg_01",
        reviewerName: "Amit S.",
        rating: 5,
        comment: "Lost 4 kgs in 10 days miraculous taste highly recommend everyone to buy this tea!",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T04:10:00Z"
      },
      {
        id: "rev_sg_02",
        reviewerName: "Pooja K.",
        rating: 5,
        comment: "Lost 4 kgs in 10 days miraculous taste highly recommend everyone to buy this tea!",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T04:12:00Z"
      },
      {
        id: "rev_sg_03",
        reviewerName: "Amit S.",
        rating: 5,
        comment: "Lost 4 kgs in 10 days miraculous taste highly recommend everyone to buy this tea!",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T04:15:00Z"
      },
      {
        id: "rev_sg_04",
        reviewerName: "Pooja K.",
        rating: 5,
        comment: "Miraculous taste lost 4 kg in 10 days very good product 100% natural weight loss.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T04:20:00Z"
      },
      {
        id: "rev_sg_05",
        reviewerName: "Ritu M.",
        rating: 5,
        comment: "Miraculous taste lost 4 kg in 10 days very good product 100% natural weight loss.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T04:25:00Z"
      },
      {
        id: "rev_sg_06",
        reviewerName: "Neha G.",
        rating: 5,
        comment: "Lost 4 kgs in 10 days miraculous taste highly recommend everyone to buy this tea!",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T04:35:00Z"
      },
      {
        id: "rev_sg_07",
        reviewerName: "Sunil D.",
        rating: 5,
        comment: "Miraculous taste lost 4 kg in 10 days very good product 100% natural weight loss.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T04:40:00Z"
      },
      {
        id: "rev_sg_08",
        reviewerName: "Amit S.",
        rating: 5,
        comment: "Best slimming tea on Meesho miraculous weight loss in 10 days genuine ayurvedic tea.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T05:00:00Z"
      },
      {
        id: "rev_sg_09",
        reviewerName: "Kavita B.",
        rating: 5,
        comment: "Lost 4 kgs in 10 days miraculous taste highly recommend everyone to buy this tea!",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T05:15:00Z"
      },
      {
        id: "rev_sg_10",
        reviewerName: "Pooja K.",
        rating: 5,
        comment: "Best slimming tea on Meesho miraculous weight loss in 10 days genuine ayurvedic tea.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T05:30:00Z"
      },
      {
        id: "rev_sg_11",
        reviewerName: "Deepak N.",
        rating: 5,
        comment: "Lost 4 kgs in 10 days miraculous taste highly recommend everyone to buy this tea!",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T06:10:00Z"
      },
      {
        id: "rev_sg_12",
        reviewerName: "Rakesh T.",
        rating: 5,
        comment: "Miraculous taste lost 4 kg in 10 days very good product 100% natural weight loss.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T06:45:00Z"
      },
      {
        id: "rev_sg_13",
        reviewerName: "Sanjay Y.",
        rating: 5,
        comment: "Lost 4 kgs in 10 days miraculous taste highly recommend everyone to buy this tea!",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T07:15:00Z"
      },
      {
        id: "rev_sg_14",
        reviewerName: "Preeti V.",
        rating: 5,
        comment: "Miraculous taste lost 4 kg in 10 days very good product 100% natural weight loss.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T08:00:00Z"
      },
      {
        id: "rev_sg_15",
        reviewerName: "Amit S.",
        rating: 5,
        comment: "Lost 4 kgs in 10 days miraculous taste highly recommend everyone to buy this tea!",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T08:30:00Z"
      },
      {
        id: "rev_sg_16",
        reviewerName: "Geeta P.",
        rating: 5,
        comment: "Best slimming tea on Meesho miraculous weight loss in 10 days genuine ayurvedic tea.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T09:10:00Z"
      },
      {
        id: "rev_sg_17",
        reviewerName: "Pooja K.",
        rating: 5,
        comment: "Lost 4 kgs in 10 days miraculous taste highly recommend everyone to buy this tea!",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T09:40:00Z"
      },
      {
        id: "rev_sg_18",
        reviewerName: "Vikas J.",
        rating: 5,
        comment: "Miraculous taste lost 4 kg in 10 days very good product 100% natural weight loss.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T10:15:00Z"
      },
      {
        id: "rev_sg_19",
        reviewerName: "Amit S.",
        rating: 5,
        comment: "Best slimming tea on Meesho miraculous weight loss in 10 days genuine ayurvedic tea.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T11:00:00Z"
      },
      {
        id: "rev_sg_20",
        reviewerName: "Pooja K.",
        rating: 5,
        comment: "Lost 4 kgs in 10 days miraculous taste highly recommend everyone to buy this tea!",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T11:30:00Z"
      },
      {
        id: "rev_sg_21",
        reviewerName: "Shalini Sinha",
        rating: 1,
        comment: "BEWARE! This is an absolute scam. The tea tastes like dust and sugar crystals. Caused severe stomach cramps and nausea within 2 hours. The FSSAI number printed on packet is completely bogus.",
        isVerifiedPurchase: true,
        reviewDate: "2024-09-12T14:10:00Z"
      },
      {
        id: "rev_sg_22",
        reviewerName: "Dr. Aniruddh Bose",
        rating: 1,
        comment: "As a physician, I strongly urge shoppers to avoid this. Medically impossible to lose 4 kg of fat in 10 days with tea bags. It contains senna laxatives that cause acute dehydration. Reported seller.",
        isVerifiedPurchase: true,
        reviewDate: "2024-09-25T17:45:00Z"
      },
      {
        id: "rev_sg_23",
        reviewerName: "Meenakshi C.",
        rating: 5,
        comment: "Lost 4 kgs in 10 days miraculous taste highly recommend everyone to buy this tea!",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T12:15:00Z"
      },
      {
        id: "rev_sg_24",
        reviewerName: "Pawan K.",
        rating: 5,
        comment: "Miraculous taste lost 4 kg in 10 days very good product 100% natural weight loss.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T13:00:00Z"
      },
      {
        id: "rev_sg_25",
        reviewerName: "Amit S.",
        rating: 5,
        comment: "Lost 4 kgs in 10 days miraculous taste highly recommend everyone to buy this tea!",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T13:45:00Z"
      },
      {
        id: "rev_sg_26",
        reviewerName: "Pooja K.",
        rating: 5,
        comment: "Best slimming tea on Meesho miraculous weight loss in 10 days genuine ayurvedic tea.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T14:20:00Z"
      },
      {
        id: "rev_sg_27",
        reviewerName: "Anil B.",
        rating: 5,
        comment: "Lost 4 kgs in 10 days miraculous taste highly recommend everyone to buy this tea!",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T15:05:00Z"
      },
      {
        id: "rev_sg_28",
        reviewerName: "Kiran L.",
        rating: 5,
        comment: "Miraculous taste lost 4 kg in 10 days very good product 100% natural weight loss.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T15:50:00Z"
      },
      {
        id: "rev_sg_29",
        reviewerName: "Manoj R.",
        rating: 5,
        comment: "Lost 4 kgs in 10 days miraculous taste highly recommend everyone to buy this tea!",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T16:30:00Z"
      },
      {
        id: "rev_sg_30",
        reviewerName: "Amit S.",
        rating: 5,
        comment: "Best slimming tea on Meesho miraculous weight loss in 10 days genuine ayurvedic tea.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T17:10:00Z"
      },
      {
        id: "rev_sg_31",
        reviewerName: "Pooja K.",
        rating: 5,
        comment: "Lost 4 kgs in 10 days miraculous taste highly recommend everyone to buy this tea!",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T17:45:00Z"
      },
      {
        id: "rev_sg_32",
        reviewerName: "Sarita Devi",
        rating: 1,
        comment: "No weight loss happened. Only diarrhoea and weakness. Complete fake reviews by seller bots.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-05T09:10:00Z"
      },
      {
        id: "rev_sg_33",
        reviewerName: "Gopal M.",
        rating: 5,
        comment: "Miraculous taste lost 4 kg in 10 days very good product 100% natural weight loss.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T18:20:00Z"
      },
      {
        id: "rev_sg_34",
        reviewerName: "Naveen H.",
        rating: 5,
        comment: "Lost 4 kgs in 10 days miraculous taste highly recommend everyone to buy this tea!",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T19:00:00Z"
      },
      {
        id: "rev_sg_35",
        reviewerName: "Kishore W.",
        rating: 5,
        comment: "Miraculous taste lost 4 kg in 10 days very good product 100% natural weight loss.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T19:35:00Z"
      },
      {
        id: "rev_sg_36",
        reviewerName: "Tarun S.",
        rating: 5,
        comment: "Lost 4 kgs in 10 days miraculous taste highly recommend everyone to buy this tea!",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T20:10:00Z"
      },
      {
        id: "rev_sg_37",
        reviewerName: "Aarti P.",
        rating: 5,
        comment: "Best slimming tea on Meesho miraculous weight loss in 10 days genuine ayurvedic tea.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T20:45:00Z"
      },
      {
        id: "rev_sg_38",
        reviewerName: "Amit S.",
        rating: 5,
        comment: "Lost 4 kgs in 10 days miraculous taste highly recommend everyone to buy this tea!",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T21:20:00Z"
      },
      {
        id: "rev_sg_39",
        reviewerName: "Pooja K.",
        rating: 5,
        comment: "Miraculous taste lost 4 kg in 10 days very good product 100% natural weight loss.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T22:00:00Z"
      },
      {
        id: "rev_sg_40",
        reviewerName: "Sanjay N.",
        rating: 5,
        comment: "Lost 4 kgs in 10 days miraculous taste highly recommend everyone to buy this tea!",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-18T22:30:00Z"
      }
    ]
  },

  // 5. Mixed product: Solimo Ergonomic High-Back Mesh Office Chair
  {
    id: "prod_solimo_chair",
    url: "https://www.amazon.in/dp/B08SOLIMO8",
    name: "Amazon Brand - Solimo Ergonomic High-Back Executive Mesh Office Chair with Lumbar Support",
    imageUrl: "https://images.unsplash.com/photo-1580481077195-c3a82da9189b?w=600&auto=format&fit=crop&q=80",
    store: "Amazon India",
    averageRating: 3.9,
    reviewCount: 35,
    reviews: [
      {
        id: "rev_sol_01",
        reviewerName: "Rakesh Nambiar",
        rating: 4,
        comment: "Assembled it by myself in 30 minutes following the diagram. Breathable mesh back is good for hot humid weather in Chennai.",
        isVerifiedPurchase: true,
        reviewDate: "2024-03-10T14:20:00Z"
      },
      {
        id: "rev_sol_02",
        reviewerName: "Pooja Sen",
        rating: 3,
        comment: "Lumbar support cushion is made of stiff plastic and cannot be adjusted backwards. Pushes too hard against lower spine after 4 hours.",
        isVerifiedPurchase: true,
        reviewDate: "2024-03-28T09:15:00Z"
      },
      {
        id: "rev_sol_03",
        reviewerName: "Vivek Sundaram",
        rating: 5,
        comment: "Good ergonomic chair for WFH setup. Wheels glide smoothly on wooden flooring and tilt mechanism feels secure.",
        isVerifiedPurchase: true,
        reviewDate: "2024-04-12T16:45:00Z"
      },
      {
        id: "rev_sol_04",
        reviewerName: "Naveen Kaushik",
        rating: 2,
        comment: "Hydraulic gas lift cylinder started sinking slowly after 4 months. Every hour I have to pull the lever to raise it back up.",
        isVerifiedPurchase: true,
        reviewDate: "2024-04-29T11:30:00Z"
      },
      {
        id: "rev_sol_05",
        reviewerName: "Anjali Bansal",
        rating: 4,
        comment: "Seat cushion foam density is adequate. Headrest is adjustable in height and angle which helps during long coding hours.",
        isVerifiedPurchase: true,
        reviewDate: "2024-05-14T15:10:00Z"
      },
      {
        id: "rev_sol_06",
        reviewerName: "Tushar Deshpande",
        rating: 5,
        comment: "Very good chair at this price point. Armrests are padded and solid. Arrived well packed in heavy corrugated box.",
        isVerifiedPurchase: false,
        reviewDate: "2024-05-25T10:00:00Z"
      },
      {
        id: "rev_sol_07",
        reviewerName: "Kunal Sethi",
        rating: 3,
        comment: "Armrests cannot be adjusted inwards or outwards, only up and down. If you have broad shoulders it might feel slightly narrow.",
        isVerifiedPurchase: true,
        reviewDate: "2024-06-08T13:40:00Z"
      },
      {
        id: "rev_sol_08",
        reviewerName: "Deepika Rao",
        rating: 4,
        comment: "Much better than wooden dining chair I was using earlier. Back pain has reduced considerably.",
        isVerifiedPurchase: true,
        reviewDate: "2024-06-22T08:55:00Z"
      },
      {
        id: "rev_sol_09",
        reviewerName: "Brijesh Mishra",
        rating: 1,
        comment: "Delivery took 11 days. One castor wheel socket was cracked in transit. Solimo support took 2 weeks to send replacement wheel.",
        isVerifiedPurchase: true,
        reviewDate: "2024-07-05T17:20:00Z"
      },
      {
        id: "rev_sol_10",
        reviewerName: "Sonia Kapoor",
        rating: 4,
        comment: "Sturdy metal base rather than cheap plastic star base. Mesh has not sagged even after 3 months of daily use.",
        isVerifiedPurchase: true,
        reviewDate: "2024-07-19T12:15:00Z"
      },
      {
        id: "rev_sol_11",
        reviewerName: "Gaurav Bhattacharya",
        rating: 5,
        comment: "Comfortable ergonomic office chair. Good lumbar support and recline lock works perfectly.",
        isVerifiedPurchase: false,
        reviewDate: "2024-08-01T14:30:00Z"
      },
      {
        id: "rev_sol_12",
        reviewerName: "Manish Chhabra",
        rating: 2,
        comment: "Recline mechanism squeaks loudly whenever leaning back. Had to spray WD-40 under seat plate to reduce creaking.",
        isVerifiedPurchase: true,
        reviewDate: "2024-08-16T10:45:00Z"
      },
      {
        id: "rev_sol_13",
        reviewerName: "Poonam Jha",
        rating: 4,
        comment: "Overall good chair. Fabric is easy to vacuum. Suitable for people up to 5'10\" height.",
        isVerifiedPurchase: true,
        reviewDate: "2024-08-28T16:05:00Z"
      },
      {
        id: "rev_sol_14",
        reviewerName: "Aditya Hegde",
        rating: 5,
        comment: "Bought for my home office setup. Great ergonomics, my posture has improved.",
        isVerifiedPurchase: false,
        reviewDate: "2024-09-09T09:20:00Z"
      },
      {
        id: "rev_sol_15",
        reviewerName: "Kavita Nair",
        rating: 3,
        comment: "Headrest feels a bit flimsy when resting full head weight. Mesh back and seat foam are comfortable though.",
        isVerifiedPurchase: true,
        reviewDate: "2024-09-18T13:50:00Z"
      },
      {
        id: "rev_sol_16",
        reviewerName: "Sameer Kulkarni",
        rating: 4,
        comment: "Solid chair with decent tilt tension control. Took about 45 mins to put all Allen key bolts in place.",
        isVerifiedPurchase: true,
        reviewDate: "2024-09-27T11:10:00Z"
      },
      {
        id: "rev_sol_17",
        reviewerName: "Reena Joseph",
        rating: 5,
        comment: "Extremely comfortable for 8 hour workday. Back mesh prevents sweating completely.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-03T15:35:00Z"
      },
      {
        id: "rev_sol_18",
        reviewerName: "Rajeev Goel",
        rating: 2,
        comment: "Seat cushion bottom is hard plywood. After 3 hours thigh pressure points start aching. Had to buy extra memory foam pad.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-08T18:15:00Z"
      },
      {
        id: "rev_sol_19",
        reviewerName: "Preeti Shenoy",
        rating: 4,
        comment: "Value for money chair under 8000. Instructions in user manual could be clearer with larger diagrams.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-12T10:25:00Z"
      },
      {
        id: "rev_sol_20",
        reviewerName: "Harish Venkat",
        rating: 5,
        comment: "Great quality chair. Fast delivery and all parts arrived in pristine condition.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-15T14:40:00Z"
      },
      {
        id: "rev_sol_21",
        reviewerName: "Siddharth Das",
        rating: 4,
        comment: "Tilt lock at 90, 105, and 120 degrees works reliably. Castors roll silently across tile floor.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-17T09:05:00Z"
      },
      {
        id: "rev_sol_22",
        reviewerName: "Anita Mukherjee",
        rating: 3,
        comment: "Okay product. Back support is good but armrest plastic feels slightly hollow.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-19T13:30:00Z"
      },
      {
        id: "rev_sol_23",
        reviewerName: "Vinay Saxena",
        rating: 5,
        comment: "Exceptional comfort for software engineers sitting for 10 hours a day. Highly satisfied.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-20T16:15:00Z"
      },
      {
        id: "rev_sol_24",
        reviewerName: "Bhavna Patel",
        rating: 4,
        comment: "Good buy on festive discount. Seat fabric is breathable and doesn't trap heat.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-21T11:45:00Z"
      },
      {
        id: "rev_sol_25",
        reviewerName: "Alok Mathur",
        rating: 1,
        comment: "Hydraulic gas piston failed after 2 months. Chair drops to lowest position abruptly. Waiting for warranty replacement.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-22T08:20:00Z"
      },
      {
        id: "rev_sol_26",
        reviewerName: "Tanvi Roy",
        rating: 4,
        comment: "Solid ergonomic structure. Headrest adjusts up/down by 5 cm which aligns well with neck.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-22T14:50:00Z"
      },
      {
        id: "rev_sol_27",
        reviewerName: "Chetan Somani",
        rating: 4,
        comment: "Good chair, easy to assemble. Took around 25 minutes with the included Allen key.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-23T10:10:00Z"
      },
      {
        id: "rev_sol_28",
        reviewerName: "Megha Vora",
        rating: 3,
        comment: "Lumbar support position cannot be changed horizontally, so pressure is fixed. Otherwise decent.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-23T17:40:00Z"
      },
      {
        id: "rev_sol_29",
        reviewerName: "Sanjay Nanda",
        rating: 5,
        comment: "Comfortable ergonomic executive chair. Excellent lumbar support and smooth wheels.",
        isVerifiedPurchase: false,
        reviewDate: "2024-10-24T09:30:00Z"
      },
      {
        id: "rev_sol_30",
        reviewerName: "Kiran Mazumdar",
        rating: 4,
        comment: "Decent purchase. Sturdy frame and back recline is relaxing for quick breaks.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-24T12:45:00Z"
      },
      {
        id: "rev_sol_31",
        reviewerName: "Dharmesh Shah",
        rating: 4,
        comment: "Mesh back ventilation works as advertised. Cushioning is firm rather than sinking.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-24T16:20:00Z"
      },
      {
        id: "rev_sol_32",
        reviewerName: "Priyanka Joshi",
        rating: 5,
        comment: "Best investment for work from home routine. Neck and back feel much more supported.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-24T19:50:00Z"
      },
      {
        id: "rev_sol_33",
        reviewerName: "Mohit Aggarwal",
        rating: 2,
        comment: "Armrest height is too low for my standing desk converter even at maximum adjustment.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-25T11:00:00Z"
      },
      {
        id: "rev_sol_34",
        reviewerName: "Sunaina Pillai",
        rating: 4,
        comment: "Durable chair. Base is heavy and doesn't tip over when leaning back completely.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-25T14:15:00Z"
      },
      {
        id: "rev_sol_35",
        reviewerName: "Anand Rathi",
        rating: 4,
        comment: "Well designed chair. Assembly was straightforward with numbered bolt packets.",
        isVerifiedPurchase: true,
        reviewDate: "2024-10-25T18:00:00Z"
      }
    ]
  }
];
