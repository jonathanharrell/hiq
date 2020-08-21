<script>
    import { isActive, hashRE, groupHeaders } from './util'
    import sidebarIcons from "../data/sidebar-icons"

    export default {
        functional: true,
        props: ['item'],
        render (h, {parent: {$page, $site, $route}, props: {item}}) {
            // use custom active class matching logic
            // due to edge case of paths ending with / + hash
            const selfActive = isActive($route, item.path)
            // for sidebar: auto pages, a hash link should be active if one of its child
            // matches
            const active = item.type === 'auto'
                ? selfActive || item.children.some(c => isActive($route, item.basePath + '#' + c.slug))
                : selfActive
            const link = renderLink(h, item.path, item.title || item.path, active)
            const configDepth = $page.frontmatter.sidebarDepth != null
                ? $page.frontmatter.sidebarDepth
                : $site.themeConfig.sidebarDepth
            const maxDepth = configDepth == null ? 1 : configDepth
            const displayAllHeaders = !!$site.themeConfig.displayAllHeaders
            if (item.type === 'auto') {
                return [link, renderChildren(h, item.children, item.basePath, $route, maxDepth)]
            } else if ((active || displayAllHeaders) && item.headers && !hashRE.test(item.path)) {
                const children = groupHeaders(item.headers)
                return [link, renderChildren(h, children, item.path, $route, maxDepth)]
            } else {
                return link
            }
        }
    }

    function renderLink (h, to, text, active) {
        return h('router-link', {
            props: {
                to,
                activeClass: '',
                exactActiveClass: ''
            },
            class: {
                active,
                'sidebar-link': true
            }
        }, [
            h(getLinkIcon(text), {
                attrs: {
                    size: '18'
                }
            }),
            text
        ])
    }

    function getLinkIcon(text) {
        return sidebarIcons[text] || '';
    }

    function renderChildren (h, children, path, route, maxDepth, depth = 1) {
        if (!children || depth > maxDepth) return null
        return h('ul', {class: 'sidebar-sub-headers'}, children.map(c => {
            const active = isActive(route, path + '#' + c.slug)
            return h('li', {class: 'sidebar-sub-header'}, [
                renderLink(h, path + '#' + c.slug, c.title, active),
                renderChildren(h, c.children, path, route, maxDepth, depth + 1)
            ])
        }))
    }
</script>

<style>
    a.sidebar-link {
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 0.25rem;
        padding: 0.5rem 1.25rem;
        border-radius: var(--hiq-border-radius);
        box-shadow: none !important;
        line-height: 1.4;
        font-weight: var(--hiq-font-weight-normal);
        color: var(--hiq-text-color);
        transition: color var(--hiq-speed) var(--hiq-easing), background-color var(--hiq-speed) var(--hiq-easing);
    }

    a.sidebar-link:visited {
        color: var(--hiq-text-color);
    }

    a.sidebar-link:hover,
    a.sidebar-link:focus,
    a.sidebar-link:visited:hover,
    a.sidebar-link:visited:focus {
        background-color: var(--hiq-color-gray-7);
        color: var(--hiq-text-color);
    }

    a.sidebar-link.active {
        font-weight: var(--hiq-font-weight-semibold);
        background-color: var(--hiq-color-gray-6) !important;
    }

    a.sidebar-link svg {
        margin-right: 0.5rem;
    }

    .sidebar ul.sidebar-sub-headers {
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid var(--hiq-color-gray-6);
    }

    .sidebar-sub-headers a.sidebar-link {
        font-size: var(--hiq-font-size-6);
        padding: 0.2rem 1.25rem;
        background-color: unset !important;
        border-left: none;
    }

    .sidebar-sub-headers a.sidebar-link svg {
        display: none;
    }

    .sidebar-sub-headers a.sidebar-link.active {
        font-weight: var(--hiq-font-weight-semibold);
    }
</style>

