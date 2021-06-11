export const data = [
  [
    {
      id: 1,
      title: 'Categories',
      isParent: true,
      children: [
        {
          id: 112,
          title: 'ALL',
          isItem: false,
          children: [
            {
              id: 'test1',
              title: 'Test',
              isItem: false,
              type: 'checkbox',
            },
          ],
        },

        {
          id: 11,
          title: 'Clothes',
          isItem: false,
          children: [
            {
              id: 121,
              isItem: true,
              type: 'list',
              title: 'Dresses',
            },
            {
              id: 122,
              isItem: true,
              type: 'list',
              title: 'Coats & Jacket',
            },
            {
              id: 123,
              isItem: true,
              type: 'list',
              title: 'Shirts',
            },
            {
              id: 124,
              isItem: true,
              type: 'list',
              title: 'Cardigans',
            },
            {
              id: 125,
              isItem: true,
              type: 'list',
              title: 'Kimonos',
            },
            {
              id: 126,
              isItem: true,
              type: 'list',
              title: 'Skirts',
            },
            {
              id: 127,
              isItem: true,
              type: 'list',
              title: 'Trousers',
            },
          ],
        },

        {
          id: 11,
          title: 'Shoes',
          isItem: false,
          children: [
            {
              id: 'shoe1',
              isItem: true,
              type: 'checkbox',
              title: 'Chelsi',
            },
          ],
        },
      ],
    },

    {
      id: 'style12',
      title: 'Style',
      isParent: true,
      children: [
        {
          id: 'st11',
          title: 'Lace',
          isItem: false,
          type: 'checkbox',
        },
        {
          id: 'st12',
          title: 'Floral',
          isItem: false,
          type: 'checkbox',
        },
        {
          id: 'st13',
          title: 'Pen',
          isItem: false,
          type: 'checkbox',
        },
        {
          id: 'st14',
          title: 'Puff sleeve',
          isItem: false,
          type: 'checkbox',
        },
        {
          id: 'st15',
          title: 'Ruffle',
          isItem: false,
          type: 'checkbox',
        },
      ],
    },
  ],

  [
    {
      id: 'p2',
      title: 'Price',
      isParent: true,
      children: [
        {
          id: 'p1',
          isItem: true,
          type: 'range',
        },
      ],
    },
    {
      id: 'c2',
      title: 'Sizes',
      isParent: true,
      children: [
        {
          id: 's1',
          isItem: true,
          title: '2XL (9)',
          type: 'checkbox',
        },
        {
          id: 's2',
          isItem: true,
          title: '3.5 (2)',
          type: 'checkbox',
        },
        {
          id: 's3',
          isItem: true,
          title: 'L (125)',
          type: 'checkbox',
        },
        {
          id: 's4',
          isItem: true,
          title: '4.5 (75)',
          type: 'checkbox',
        },
        {
          id: 's5',
          isItem: true,
          title: 'XS/XL (9)',
          type: 'checkbox',
        },
        {
          id: 's6',
          isItem: true,
          title: 'Atelier Rebul',
          type: 'checkbox',
        },
      ],
    },
    {
      id: 'd2',
      title: 'Discount',
      isParent: true,
      children: [
        {
          id: 'd1',
          isItem: true,
          title: 'Less than 10%',
          type: 'checkbox',
        },
        {
          id: 'd2',
          isItem: true,
          title: '50% or More',
          type: 'checkbox',
        },
        {
          id: 'd3',
          isItem: true,
          title: '40% or More',
          type: 'checkbox',
        },
        {
          id: 'd4',
          isItem: true,
          title: '20% or More',
          type: 'checkbox',
        },
        {
          id: 'd5',
          isItem: true,
          title: '10% or More',
          type: 'checkbox',
        },
      ],
    },
  ],

  [
    {
      id: 2,
      title: 'Colors',
      isParent: true,
      children: [
        {
          id: 11,
          title: 'test',
          isItem: true,
          type: 'colors',
          colors: [
            'efe8d8',
            '000000',
            'ddd',
            '067506',
            'fb8dab',
            'fff',
            '192b41',
          ],
        },
      ],
    },

    {
      id: 'b2',
      title: 'Brands',
      isParent: true,
      children: [
        {
          id: 'B1',
          isItem: true,
          title: 'Nocturne',
          type: 'checkbox',
        },
        {
          id: 'B2',
          isItem: true,
          title: 'La Vie Jewelry',
          type: 'checkbox',
        },
        {
          id: 'B3',
          isItem: true,
          title: 'Machka',
          type: 'checkbox',
        },
        {
          id: 'B4',
          isItem: true,
          title: 'Ipekyal ',
          type: 'checkbox',
        },
        {
          id: 'B5',
          isItem: true,
          title: 'Trendyol',
          type: 'checkbox',
        },
        {
          id: 'B6',
          isItem: true,
          title: 'Atelier Rebul',
          type: 'checkbox',
        },
      ],
    },

    {
      id: 'bi2',
      title: 'Brand Information',
      isParent: true,
      children: [
        {
          type: 'info',
          title: "Women's Clothing Kuwait",
          description:
            'Armada group is a family owned clothing and Accessories Company, founded in Kuwait in 1973 by AL Tahan Family. Armada has grown from a single fast fashion store into ',
        },
      ],
    },
  ],
  [
    {
      id: 2,
      title: 'Top Type',
      isParent: true,
    },
    {
      id: 2,
      title: 'Bottom Type',
      isParent: true,
    },
    {
      id: 2,
      title: 'Pattern Type',
      isParent: true,
    },
    {
      id: 2,
      title: 'Sleeve Lenght',
      isParent: true,
    },

    {
      id: 'absd',
      title: 'Tags',
      isParent: true,
      children: [
        {
          id: 211222,
          isItem: true,
          type: 'tags',
          tags: ['Trending', 'Ramadan', 'Sale', 'New Season'],
        },
      ],
    },
  ],
];
