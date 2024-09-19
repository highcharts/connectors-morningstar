/* eslint-disable */
export default (ctx: Record<string, any>) => `<!DOCTYPE html>
<html prefix="og: http://ogp.me/ns#">
    <head>

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${ctx.node.meta.fullname ? ctx.node.meta.fullname + ' | ' : ''}${ctx.productName} ${ctx.platform} API Reference</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
        <link rel="stylesheet" href="/static/style.css" type="text/css" />

        <link rel="apple-touch-icon" sizes="57x57" href="/static/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/static/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/static/apple-touch-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/static/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/static/apple-touch-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/static/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/static/apple-touch-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/static/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon-180x180.png" />
        <link rel="icon" type="image/png" href="/static/favicon-192x192.png" sizes="192x192" />
        <link rel="icon" type="image/png" href="/static/favicon-160x160.png" sizes="160x160" />
        <link rel="icon" type="image/png" href="/static/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/static/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" type="image/png" href="/static/favicon-32x32.png" sizes="32x32" />

        <meta property="og:description" content="${ctx.opengraph.description}" />
        <meta property="og:determiner" content="${ctx.opengraph.determiner}" />
        <meta property="og:image" content="${ctx.opengraph.image}" />
        <meta property="og:site_name" content="${ctx.opengraph.sitename}" />
        <meta property="og:title" content="${ctx.opengraph.title}" />
        <meta property="og:type" content="${ctx.opengraph.type}" />
        <meta property="og:url" content="${ctx.opengraph.url}" />
        <meta name="searchboost" content="${ctx.searchBoost}" />
        <meta name="searchtitle" content="${ctx.searchTitle}" />
        <meta name="twitter:card" content="${ctx.twitter.card}" />
        <meta name="twitter:creator" content="${ctx.twitter.creator}" />
        <meta name="twitter:site" content="${ctx.twitter.site}" />

        <script type="text/javascript" src="/static/api.js"></script>
        <script type="text/javascript" src="/websearch/highsoft-websearch.js"></script>

    </head>
    <body>

        <header class="header">
            <div class="row row-1">
                <div id="sidebar-link" class="cell sidebar-link">
                    <a href="#"><i class="fa fa-bars" aria-hidden="true"></i></a>
                </div>
                <div id="highcharts-logo" class="cell">
                    <a href="https://www.highcharts.com/" title="Highcharts Home Page">
                        <img alt="Highcharts Home Page" src="/static/highcharts.svg" border="0">
                    </a>
                </div>
                <div id="page-title" class="cell">
                    <h1>
                        <a href="/${ctx.productModule}/">
                            ${ctx.platform} API Reference
                        </a>
                    </h1>
                </div>
            </div>
            <div class="row row-2">
                ${ctx.toc ? `
                    <div id="product-selector" class="menu" expanded="false">
                        <a href="#" class="dropdown-link">${ctx.productName} <i class="fa fa-chevron-down" aria-hidden="true"></i></a>
                        <div class="dropdown-menu">
                            <ul>
                                ${Object.entries<any>(ctx.toc).map(([key, ths]): string => `
                                <li class="product ${ths.active ? 'highlighted' : ''}">
                                    <a id="${key}-link" href="${ths.versions.current ? ths.versions.current : '#' }">${ths.displayName}</a>
                                </li>
                                `)}
                            </ul>
                        </div>
                    </div>
                    ${ctx.platforms ? `
                        <div id="platform-selector" class="menu" expanded="false">
                            <a href="#" class="dropdown-link">${ctx.platform}<i class="fa fa-chevron-down" aria-hidden="true"></i></a>
                            <div class="dropdown-menu">
                                <ul class="group-list">
                                    ${Object.entries<any>(ctx.platforms).map(([key, ths]): string => `
                                    <li class="group ${ths.active ? 'highlighted' : ''}">
                                        <a href="${this}">${key}</a>
                                    </li>
                                    `)}
                                </ul>
                            </div>
                        </div>
                    ` : ''}
                    ${ctx.version ? `
                    <div id="version" class="menu">
                        <a href="https://www.highcharts.com/changelog/" target="_blank">v${ctx.version}</a>
                    </div>
                    ` : ''}
                    ${ctx.includeClassReference ? `
                        <div id="namespaces" class="menu">
                            <a href="../class-reference/Highcharts">Namespaces</a>
                        </div>
                        <div id="classes" class="menu">
                            <a href="../class-reference/classes.list">Classes</a>
                        </div>
                        <div id="interfaces" class="menu">
                            <a href="../class-reference/interfaces.list">Interfaces</a>
                        </div>
                    ` : ''}
                ` : ''}
            </div>
            </div>
        </header>

        <div class="wrapper">
            <div id="sidebar" class="navigation sidebar" expanded="false">
                <div id="search" class="search-wrapper">
                    <input type="text" autocapitalize="off" autocomplete="off" autocorrect="off" class="search" dir="auto" placeholder="Search - return for full results" />
                    <button title="Full results"><i class="fa fa-search"></i></button>
                    <ul class="results" style="display: none;"></ul>
                </div>
                <div id="option-trees-wrapper">
                    <h3 id="options-header">Configuration options</h3>
                    <p>For initial declarative chart setup. Download as <a href="${ctx.downloadUrl}">ZIP</a> or <a href="tree.json">JSON</a>.</p>
                    ${ctx.product.noGlobalOptions ? '' : `
                        <div class="global-options options-tree">
                            <code>${ctx.product.namespace}.setOptions({</code>
                            <div id="global-options" class="tree"></div>
                            <code>});</code>
                        </div>
                    `}
                    <div class="options-tree">
                        <code>${ctx.product.namespace}.${ctx.constr}({</code>
                        <div id="options" class="tree">
                            ${ctx.node.meta.name ? `
                                <div class="node expanded option-${ctx.node.meta.name} parent">
                                    <a class="title" href=".">
                                        ${ctx.node.meta.name}:${ctx.node.children ? '<i class="fa fa-caret-right"></i>' : ''}
                                    </a>
                                    ${ctx.node.children ? `
                                        <span class="bracket start">{</span>
                                        <div class="children" style="max-height:none;">
                                    ` : ''}
                            `: ''}
                            ${Object.keys(ctx.node.children).length ? `
                                ${Object.entries<any>(ctx.node.children).map(([_key, ths]): string => `
                                    <div class="node collapsed option-${ths.shortName} ${ctx.node.meta.name ? 'leaf' : 'parent'}">
                                        <a class="title" href="${ths.name}">
                                            ${ths.shortName}:${ths.node.children ? '<i class="fa fa-caret-right"></i>' : ''}
                                        </a>
                                        ${ths.node.children ? `
                                            <span class="bracket start">{</span>
                                            <span class="dots">...</span>
                                            <span class="bracket end first">}</span>
                                        ` : `
                                            <span class="default type-undefined">${ths.node.doclet.defaultvalue ? ths.node.doclet.defaultvalue : 'null'}</span>
                                        `}
                                    </div>
                                `)}
                            ` : `
                                <span class="default type-undefined">${ctx.node.doclet.defaultvalue ? ctx.node.doclet.defaultvalue : 'null'}</span>
                            `}
                            ${ctx.node.meta.name ? `
                                    ${ctx.node.children ? `
                                        </div>
                                        <span class="bracket end second">}</span>
                                    ` : ''}
                                </div>
                            ` : ''}
                        </div>
                        <code>});</code>
                    </div>
                </div>
                ${ctx.product.noClassReference ? '' : `
                    <div id="members-wrapper">
                        <h3>Members and properties</h3>
                        <p>For modifying the chart at runtime. See the <a href="/class-reference/classes.list">class reference</a>.</p>
                    </div>
                `}
            </div>

            <div id="body" class="body${ctx.meta.fullname ? ' loaded' : ''}">
                <div id="splashText">
                    <h1>Welcome to the <strong>${ctx.productName} ${ctx.platform}</strong> (${ctx.productModule}) Options Reference</h1>
                    <p>These pages outline the chart configuration options, and the methods and properties of ${ctx.product.namespace} objects.</p>
                    <p>Feel free to search this <a target="_blank" href="https://en.wikipedia.org/wiki/Application_programming_interface">API</a> through the search bar or the navigation tree in the sidebar.</p>
                </div>
                <div id="search-text-results" style="display:none;"></div>
                <div id="option-list">
                    ${ctx.node.meta.fullname ? `
                        <div class="option highlighted">
                            <h1 class="title">${ctx.node.meta.fullname}</h1>
                            <p class="description">
                                <p>${escape(ctx.node.doclet.description)}</p>
                                ${ctx.node.doclet.productdesc ? `
                                    <p>${escape(ctx.node.doclet.productdesc.value)}</p>
                                ` : ''}
                            </p>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>

        <div class="footer">
            <p>Copyright &copy; ${ctx.year}, Highsoft AS. All rights reserved.</p>
            <div id="footer-social" class="footer-social">
                <a href="https://www.facebook.com/Highcharts" title="Facebook" class="social-icon"><i class="fa fa-facebook"></i></a>
                <a href="https://twitter.com/Highcharts" title="Twitter" class="social-icon"><i class="fa fa-twitter"></i></a>
                <a href="https://www.linkedin.com/company/highsoft-solutions-as" title="LinkedIn" class="social-icon"><i class="fa fa-linkedin"></i></a>
                <a href="https://github.com/highcharts/highcharts" title="Github" class="social-icon"><i class="fa fa-github"></i></a>
            </div>

            <p>
                ${ctx.productName} v${ctx.version} -
                Generated from branch
                <a href="https://github.com/highcharts/highcharts/tree/${ctx.versionProps.branch}">${ctx.versionProps.branch}</a>
                (commit <a href="https://github.com/highcharts/highcharts/commit/${ctx.versionProps.commit}">${ctx.versionProps.commit}</a>), on ${ctx.date}
            </p>
        </div>
        <script>
            var state = '${ctx.name}',
                hasChildren = true,
                product = '${ctx.productModule}';

            ${ctx.node.meta.hasChildren ? '' : `
            hasChildren = false;
            `}
            hapi.createNavigation('#options', '#global-options', state, product);
            hapi.createBody('#body', state, hasChildren);
            hapi.initializeDropdowns('.menu', '.dropdown-link', '.body');
            hapi.initializeSidebar('.sidebar', '.sidebar-link', '.body');
            hapi.initializeSearchBar('.search', '#search button', '.results', '#search-text-results', 'search.json', 2, 20);
            //hapi.simulateHistory();

            // Populate version
            // hapi.populateVersions();

        </script>

    </body>

</html>
`;
