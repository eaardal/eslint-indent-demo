module.exports = {
  extends: ['airbnb', 'plugin:jest/recommended', 'prettier'],
  parser: 'babel-eslint',
  env: {
    jest: true,
    browser: true,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.development.js',
      },
    },
  },
  plugins: ['jest', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'max-len': [2, { code: 80, ignoreComments: true, ignoreStrings: true }],
    'linebreak-style': 0, // Because people use different line break style in different IDEs
    'react/jsx-filename-extension': [2, { extensions: ['.spec.js', '.jsx'] }], // Because we use React components in test we need to allow .spec.js
    'react/no-unused-prop-types': [2, { skipShapeProps: true }], // Need to skip prop types that are shape() because it is impossible to accurately detect whether or not a React.PropTypes.shape's values are being used
    'jsx-a11y/no-static-element-interactions': [0], // We have disabled this since it is a bit strict. We would like to click e.g. <li> elements
    'import/no-extraneous-dependencies': [2, { devDependencies: true }], // Should be allowed to reference devDependencies (e.g. in tests)
    'import/prefer-default-export': 0,
    'import/no-named-as-default': 0,
    'class-methods-use-this': 0,
  },
};
