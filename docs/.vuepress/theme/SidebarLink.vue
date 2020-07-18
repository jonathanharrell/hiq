<script>
    import { isActive, hashRE, groupHeaders } from './util'

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
        }, text)
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
    .sidebar .sidebar-sub-headers {
        padding-left: 1rem;
    }

    a.sidebar-link {
        display: inline-block;
        width: 100%;
        padding: 0.35rem 1rem 0.35rem 1.25rem;
        border-left: 0.25rem solid transparent;
        box-shadow: none !important;
        line-height: 1.4;
        font-weight: var(--hiq-font-weight-normal);
        color: var(--hiq-color-gray-3);
    }

    a.sidebar-link:visited {
        color: var(--hiq-color-gray-3);
    }

    a.sidebar-link:hover,
    a.sidebar-link:visited:hover,
    a.sidebar-link:visited:focus {
        color: var(--hiq-color-primary);
    }

    a.sidebar-link.active {
        border-left-color: var(--hiq-color-primary);
        font-weight: var(--hiq-font-weight-semibold);
        color: var(--hiq-color-primary);
    }

    .sidebar-group a.sidebar-link {
        padding-left: 2rem;
    }

    .sidebar-sub-headers a.sidebar-link {
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        border-left: none;
    }

    .sidebar-sub-headers a.sidebar-link.active {
        font-weight: var(--hiq-font-weight-medium);
    }
</style>

