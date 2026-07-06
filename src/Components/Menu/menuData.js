export const menuCategories = ['Pizza', 'Burgers', 'Cakes', 'Drinks', 'Combos'];

const buildItems = (category, prefix, descriptions, startPrice, image) =>
  Array.from({ length: 15 }, (_, index) => ({
    category,
    name: `${prefix} ${index + 1}`,
    desc: descriptions[index % descriptions.length],
    price: `₹${(startPrice + index * 0.4).toFixed(2)}`,
    img: `${image}?v=${index + 1}`
  }));

export const allMenuItems = [
  ...buildItems('Pizza', 'Pizza Delight', [
    'Cheesy crust with garden-fresh toppings.',
    'Stone-baked pizza with rich tomato sauce.',
    'Loaded with mozzarella and herbs.'
  ], 12.99, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'),
  ...buildItems('Burgers', 'Burger Bite', [
    'Juicy patty with crisp lettuce.',
    'Double cheese and smoky sauce.',
    'Soft bun with crunchy filling.'
  ], 10.99, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'),
  ...buildItems('Cakes', 'Cake Slice', [
    'Soft sponge with chocolate layers.',
    'Creamy delight for sweet moments.',
    'Rich dessert with smooth frosting.'
  ], 7.99, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80'),
  ...buildItems('Drinks', 'Drink Fresh', [
    'Cool and refreshing with citrus notes.',
    'Light fizz with minty flavor.',
    'Chilled sips for sunny days.'
  ], 5.49, 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?auto=format&fit=crop&w=800&q=80'),
  ...buildItems('Combos', 'Combo Feast', [
    'Perfect mix for one hungry plate.',
    'Great value meal with sides.',
    'A full bite, sip, and dessert combo.'
  ], 16.49, 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80')
];
