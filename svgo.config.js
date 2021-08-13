module.exports = {
  multipass: true,
  datauri: 'base64',
  js2svg: {
    indent: 2,
    pretty: false,
  },
  plugins: [
    'removeDoctype',
    'removeXMLProcInst',
    'removeComments',
    'removeMetadata',
    'removeEditorsNSData',
    'cleanupAttrs',
    'inlineStyles',
    'minifyStyles',
    'removeRasterImages',
    'removeUselessDefs',
    'cleanupNumericValues',
    'cleanupListOfValues',
    'convertColors',
    'removeUnknownsAndDefaults',
    'removeNonInheritableGroupAttrs',
    'removeUselessStrokeAndFill',
    'cleanupEnableBackground',
    'removeHiddenElems',
    'removeEmptyText',
    'convertShapeToPath',
    'convertEllipseToCircle',
    'moveElemsAttrsToGroup',
    'moveGroupAttrsToElems',
    'collapseGroups',
    'convertPathData',
    'convertTransform',
    'removeEmptyAttrs',
    'removeEmptyContainers',
    'mergePaths',
    'removeUnusedNS',
    'sortDefsChildren',
    'removeTitle',
    'removeDesc',
    {
      name: 'cleanupIDs',
      params: {
        prefix: {
          toString: function () {
            return Math.random().toString(36).substr(2, 9) + '';
          },
        },
      },
    },
    {
      name: 'removeAttrs',
      params: {
        attrs: ['svg:width', 'svg:height'],
      },
    },
  ],
};
