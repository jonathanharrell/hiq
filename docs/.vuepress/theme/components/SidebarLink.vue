<script>
    import { isActive, hashRE, groupHeaders } from '../util';
    import sidebarIcons from '../data/sidebar-icons';

    export default {
        functional: true,

        props: {
            item: {
                type: Object,
                default: () => {},
            },
        },

        render(
            createElement,
            { parent: { $page, $site, $route }, props: { item } }
        ) {
            // use custom active class matching logic
            // due to edge case of paths ending with / + hash
            const selfActive = isActive($route, item.path);

            // for sidebar: auto pages, a hash link should be active if one of its child
            // matches
            const active =
                item.type === 'auto'
                    ? selfActive ||
                      item.children.some((c) =>
                          isActive($route, item.basePath + '#' + c.slug)
                      )
                    : selfActive;

            const link = renderLink(
                createElement,
                item.path,
                item.title || item.path,
                active
            );

            const configDepth =
                $page.frontmatter.sidebarDepth != null
                    ? $page.frontmatter.sidebarDepth
                    : $site.themeConfig.sidebarDepth;

            const maxDepth = configDepth == null ? 1 : configDepth;
            const displayAllHeaders = !!$site.themeConfig.displayAllHeaders;

            if (item.type === 'auto') {
                return [
                    link,
                    renderChildren(
                        createElement,
                        item.children,
                        item.basePath,
                        $route,
                        maxDepth
                    ),
                ];
            } else if (
                (active || displayAllHeaders) &&
                item.headers &&
                !hashRE.test(item.path)
            ) {
                const children = groupHeaders(item.headers);

                return [
                    link,
                    renderChildren(
                        createElement,
                        children,
                        item.path,
                        $route,
                        maxDepth
                    ),
                ];
            } else {
                return link;
            }
        },
    };

    function renderLink(createElement, to, text, active) {
        return createElement(
            'router-link',
            {
                props: {
                    to,
                    activeClass: '',
                    exactActiveClass: '',
                },
                class: {
                    active,
                    'sidebar-link': true,
                },
            },
            [
                createElement(getLinkIcon(text), {
                    attrs: {
                        size: '18',
                    },
                }),
                text,
            ]
        );
    }

    function getLinkIcon(text) {
        return sidebarIcons[text] || '';
    }

    function renderChildren(
        createElement,
        children,
        path,
        route,
        maxDepth,
        depth = 1
    ) {
        if (!children || depth > maxDepth) return null;

        return createElement(
            'ul',
            { class: 'sidebar-sub-headers' },
            children.map((child) => {
                const active = isActive(route, path + '#' + child.slug);

                return createElement('li', { class: 'sidebar-sub-header' }, [
                    renderLink(
                        createElement,
                        path + '#' + child.slug,
                        child.title,
                        active
                    ),
                    renderChildren(
                        createElement,
                        child.children,
                        path,
                        route,
                        maxDepth,
                        depth + 1
                    ),
                ]);
            })
        );
    }
</script>

<style lang="scss">
    .sidebar-link {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 0.25rem;
        padding: 0.5rem 1.25rem;
        box-shadow: none !important;
        line-height: 1.4;
        font-weight: var(--hiq-font-weight-normal);
        color: var(--hiq-text-color);
        transition: color var(--hiq-speed) var(--hiq-easing),
            background-color var(--hiq-speed) var(--hiq-easing);

        @media (min-width: 720px) {
            border-radius: var(--hiq-border-radius);
        }

        &:visited {
            color: var(--hiq-text-color);
        }

        &:hover,
        &:focus,
        &:visited:hover,
        &:visited:focus {
            background-color: var(--hiq-color-gray-7);
            color: var(--hiq-text-color);
        }

        &.active {
            font-weight: var(--hiq-font-weight-semibold);
            background-color: var(--hiq-color-gray-6) !important;
        }

        svg {
            margin-right: 0.5rem;
        }
    }

    .sidebar-sub-headers {
        margin-top: 0.5rem !important;
        margin-bottom: 1rem !important;
        padding-bottom: 1rem !important;
        border-bottom: 1px solid var(--hiq-color-gray-6);

        .sidebar-link {
            padding: 0.2rem 1.25rem;
            border-left: none;
            background-color: unset !important;
            font-size: var(--hiq-font-size-6);
            color: var(--hiq-color-gray-4);
            transition: all var(--hiq-speed) var(--hiq-easing);

            &:hover,
            &.active {
                color: var(--hiq-text-color);
            }

            &:hover {
                transform: translateX(0.1rem);
            }

            &.active {
                font-weight: var(--hiq-font-weight-semibold);
            }

            svg {
                display: none;
            }
        }
    }
</style>
