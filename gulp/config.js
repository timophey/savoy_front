const srcPath = 'src';
const dstPath = 'build';

const config = {
    src: {
        root: srcPath,
        sass: `${srcPath}/scss`,
        js: `${srcPath}/js`,
        fonts: `${srcPath}/assets/fonts`,
        images: `${srcPath}/assets/images`,
        pug: `${srcPath}/pug`,
        icons: `${srcPath}/assets/icons`
    },
    dest: {
        root: dstPath,
        html: dstPath,
        css:   `${dstPath}/css`,
        js:    `${dstPath}/js`,
        fonts: `${dstPath}/fonts`,
        images: `${dstPath}/images`,
        icons: `${dstPath}/icons`,

    },
    setEnv() {
        this.isProd = process.argv.includes('--prod');
        this.isDev = !this.isProd;
    },
    svgicon: {
        // dest: `${dstPath}/ico`,
        dest: `${dstPath}/ico`,
        log: null,
        shape: {
            id: { // SVG shape ID related options
                separator: '--', // Separator for directory name traversal
                generator: function () { /*...*/ }, // SVG shape ID generator callback
                pseudo: '~' // File name separator for shape states (e.g. ':hover')
            },
            dimension: {// Dimension related options
                maxWidth: 48, // Max. shape width
                maxHeight: 48, // Max. shape height
                precision: 2, // Floating point precision
                attributes: false, // Width and height attributes on embedded shapes
            },
            spacing: { // Spacing related options
                padding: 0, // Padding around all shapes
                box: 'content' // Padding strategy (similar to CSS `box-sizing`)
            },
            transform: ['svgo'], // List of transformations / optimizations
            meta: null, // Path to YAML file with meta / accessibility data
            align: null, // Path to YAML file with extended alignment data
            dest: null // Output directory for optimized intermediate SVG shapes
    
        },
        svg: { // General options for created SVG files
            xmlDeclaration: true, // Add XML declaration to SVG sprite
            doctypeDeclaration: true, // Add DOCTYPE declaration to SVG sprite
            namespaceIDs: true, // Add namespace token to all IDs in SVG shapes
            namespaceIDPrefix: '', // Add a prefix to the automatically generated namespaceIDs
            namespaceClassnames: true, // Add namespace token to all CSS class names in SVG shapes
            dimensionAttributes: true // Width and height attributes on the sprite
        },
        variables: {}
    }
}

export default config;