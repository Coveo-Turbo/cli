import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import BuildLocalization from './BuildLocalization';
require('dotenv-defaults').config();

const plugins = [ 
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: './css/[name].css'
  }),
  BuildLocalization(),
]

module.exports = {
  output: {
    // See SwapVar.ts as for why this need to be a temporary variable
    libraryTarget: 'umd',
    filename: `[name].js`
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.svg', '.scss', '.css'],
    alias: {
      svg: path.resolve('./src/images/svg'),
      sass: path.resolve('./src/stylesheets'),
    }
  },
  resolveLoader: {
    alias: {
      'inject-swapvar': require.resolve('./injectSwapVar'),
    }
  },
  externals: {
    'coveo-search-ui': {
      commonjs: 'coveo-search-ui',
      commonjs2: 'coveo-search-ui',
      amd: 'coveo-search-ui',
      root: 'Coveo',
    },
    underscore: {
      commonjs: 'underscore',
      commonjs2: 'underscore',
      amd: 'underscore',
      root: '_',
    },
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[folder]/[name].[ext]'
          }
        }]
      },
      {
        test: /\.(ttf|eot|woff|woff2|otf)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /cultures.*\.(js)$/,
        loader: 'file-loader',
        exclude: /node_modules/,
        options: {
          name: 'js/cultures/[name].[ext]'
        }
      },
      {
        test: /\.tsx?$/,
        use: [
          'ts-loader',
          'inject-swapvar',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        use: [{
          loader: 'svg-inline-loader'
        }]
      }
    ]
  }
};