
const hotels = [
  {
    id: 1,
    name: 'Hotel Royal Palace',
    location: { country: 'India', city: 'Delhi' },
    price_per_night: 120.0,
    rating: 4.3,
    available_rooms: 10,
    amenities: ['wifi', 'air_conditioning', 'restaurant'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'A luxury hotel in the heart of Delhi.'
  },
  {
    id: 2,
    name: 'Budget Inn Delhi',
    location: { country: 'India', city: 'Delhi' },
    price_per_night: 60.0,
    rating: 3.8,
    available_rooms: 5,
    amenities: ['wifi', 'parking'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'Affordable comfort for travelers in central Delhi.'
  },
  {
    id: 3,
    name: 'Seaside Resort',
    location: { country: 'France', city: 'Nice' },
    price_per_night: 150.0,
    rating: 4.6,
    available_rooms: 8,
    amenities: ['wifi', 'pool', 'bar'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'A beachfront resort with premium facilities.'
  },
  {
    id: 4,
    name: 'The Manhattan Tower',
    location: { country: 'USA', city: 'New York' },
    price_per_night: 350.0,
    rating: 4.8,
    available_rooms: 15,
    amenities: ['wifi', 'gym', 'spa', 'bar', 'room_service'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'Experience unparalleled luxury with stunning city views.'
  },
  {
    id: 5,
    name: 'Kyoto Traditional Ryokan',
    location: { country: 'Japan', city: 'Kyoto' },
    price_per_night: 220.0,
    rating: 4.9,
    available_rooms: 6,
    amenities: ['wifi', 'spa', 'restaurant', 'garden'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'Authentic Japanese hospitality in a serene setting.'
  },
  {
    id: 6,
    name: 'London Central Hub',
    location: { country: 'UK', city: 'London' },
    price_per_night: 180.0,
    rating: 4.4,
    available_rooms: 20,
    amenities: ['wifi', 'air_conditioning', 'bar'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'A modern hotel located steps away from major attractions.'
  },
  {
    id: 7,
    name: 'Sydney Harbour Grand',
    location: { country: 'Australia', city: 'Sydney' },
    price_per_night: 280.0,
    rating: 4.7,
    available_rooms: 12,
    amenities: ['wifi', 'pool', 'gym', 'restaurant'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'Breathtaking views of the Sydney Opera House and Harbour Bridge.'
  },
  {
    id: 8,
    name: 'Roman Holiday Inn',
    location: { country: 'Italy', city: 'Rome' },
    price_per_night: 130.0,
    rating: 4.2,
    available_rooms: 18,
    amenities: ['wifi', 'air_conditioning', 'pet_friendly'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'Charming accommodation in the historic heart of Rome.'
  },
  {
    id: 9,
    name: 'Dubai Desert Oasis',
    location: { country: 'UAE', city: 'Dubai' },
    price_per_night: 450.0,
    rating: 4.9,
    available_rooms: 25,
    amenities: ['wifi', 'pool', 'spa', 'bar', 'gym', 'restaurant'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'An opulent escape with world-class amenities in Dubai.'
  },
  {
    id: 10,
    name: 'Parisian Charm',
    location: { country: 'France', city: 'Paris' },
    price_per_night: 210.0,
    rating: 4.6,
    available_rooms: 9,
    amenities: ['wifi', 'air_conditioning', 'room_service'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'A quaint boutique hotel with romantic views of Paris.'
  },
  {
    id: 11,
    name: 'Grand Mumbai Heights',
    location: { country: 'India', city: 'Mumbai' },
    price_per_night: 180.0,
    rating: 4.7,
    available_rooms: 15,
    amenities: ['wifi', 'pool', 'gym', 'spa'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'A modern skyscraper hotel with panoramic views of the city.'
  },
  {
    id: 12,
    name: 'Berlin Urban Stay',
    location: { country: 'Germany', city: 'Berlin' },
    price_per_night: 90.0,
    rating: 4.0,
    available_rooms: 10,
    amenities: ['wifi', 'parking', 'bar'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'Trendy and affordable lodging in the vibrant city of Berlin.'
  },
  {
    id: 13,
    name: 'Singapore Sky Garden',
    location: { country: 'Singapore', city: 'Singapore' },
    price_per_night: 320.0,
    rating: 4.8,
    available_rooms: 20,
    amenities: ['wifi', 'pool', 'restaurant', 'bar', 'gym'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'Famous for its rooftop infinity pool and lush gardens.'
  },
  {
    id: 14,
    name: 'The Alpine Lodge',
    location: { country: 'Switzerland', city: 'Interlaken' },
    price_per_night: 260.0,
    rating: 4.7,
    available_rooms: 7,
    amenities: ['wifi', 'spa', 'restaurant', 'parking', 'pet_friendly'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'A cozy mountain retreat with stunning views of the Swiss Alps.'
  },
  {
    id: 15,
    name: 'Goa Beachside Villa',
    location: { country: 'India', city: 'Goa' },
    price_per_night: 110.0,
    rating: 4.4,
    available_rooms: 12,
    amenities: ['wifi', 'pool', 'beach_access', 'bar'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'Relax and unwind at our beautiful villa right on the beach.'
  },
  {
    id: 16,
    name: 'Toronto Lakeside Hotel',
    location: { country: 'Canada', city: 'Toronto' },
    price_per_night: 160.0,
    rating: 4.3,
    available_rooms: 14,
    amenities: ['wifi', 'gym', 'restaurant'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'Modern comfort with convenient access to downtown Toronto.'
  },
  {
    id: 17,
    name: 'Rio Beachfront Paradise',
    location: { country: 'Brazil', city: 'Rio de Janeiro' },
    price_per_night: 140.0,
    rating: 4.1,
    available_rooms: 15,
    amenities: ['wifi', 'pool', 'bar', 'beach_access'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'Vibrant hotel located on the famous Copacabana beach.'
  },
  {
    id: 18,
    name: 'Bangkok City Lights',
    location: { country: 'Thailand', city: 'Bangkok' },
    price_per_night: 75.0,
    rating: 3.9,
    available_rooms: 18,
    amenities: ['wifi', 'air_conditioning', 'pool'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'An affordable hotel in the bustling heart of Bangkok.'
  },
  {
    id: 19,
    name: 'Amsterdam Canal House',
    location: { country: 'Netherlands', city: 'Amsterdam' },
    price_per_night: 170.0,
    rating: 4.5,
    available_rooms: 9,
    amenities: ['wifi', 'parking'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'A historic and picturesque hotel overlooking the canals.'
  },
  {
    id: 20,
    name: 'Jaipur Heritage Villa',
    location: { country: 'India', city: 'Jaipur' },
    price_per_night: 95.0,
    rating: 4.5,
    available_rooms: 8,
    amenities: ['wifi', 'pool', 'restaurant', 'garden'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'Experience royal Rajasthani culture in a traditional haveli.'
  },
  {
    id: 21,
    name: 'The Dubliner Inn',
    location: { country: 'Ireland', city: 'Dublin' },
    price_per_night: 125.0,
    rating: 4.2,
    available_rooms: 13,
    amenities: ['wifi', 'bar', 'restaurant'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'A lively inn with a traditional Irish pub on-site.'
  },
  {
    id: 22,
    name: 'Cairo Nile View Suites',
    location: { country: 'Egypt', city: 'Cairo' },
    price_per_night: 135.0,
    rating: 4.0,
    available_rooms: 16,
    amenities: ['wifi', 'pool', 'air_conditioning', 'restaurant'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'Comfortable suites with stunning views of the Nile River.'
  },
  {
    id: 23,
    name: 'Moscow Winter Palace',
    location: { country: 'Russia', city: 'Moscow' },
    price_per_night: 200.0,
    rating: 4.6,
    available_rooms: 11,
    amenities: ['wifi', 'spa', 'restaurant', 'gym'],
    images: [
      'https://i.pinimg.com/736x/b6/6b/e4/b66be4e3cfae7ac25b9f42d1ea57492c.jpg',
      'https://i.pinimg.com/736x/5d/25/4b/5d254b0df439de6dcac942a1d841eef6.jpg',
      'https://i.pinimg.com/474x/f1/63/ab/f163ab2a46628234668a878a83d81f4e.jpg',
      'https://i.pinimg.com/736x/5f/5b/c7/5f5bc76d5fb5e936c185df2cea318733.jpg'
    ],
    description: 'Grandeur and elegance in the heart of the Russian capital.'
  }
];

export default hotels;
