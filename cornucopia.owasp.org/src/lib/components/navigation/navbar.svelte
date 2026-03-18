<script lang="ts">
    import { page } from "$app/stores";
    import { AddLink, type Link } from "./utils";
    import { readTranslation, readLang } from "$lib/stores/stores";

    let {} = $props();

    let t = readTranslation();
    let lang = readLang();

    let mainMenu: Link[] = [];
    AddLink(mainMenu, ($t as any)('home.title'), "/");
    AddLink(mainMenu, ($t as any)('play.title'), "/how-to-play");
    AddLink(mainMenu, ($t as any)('cards.title'), "/cards");
    AddLink(mainMenu, ($t as any)('taxonomy.title'), "/taxonomy");
    AddLink(mainMenu, ($t as any)('news.title'), "/news");
    AddLink(mainMenu, ($t as any)('about.title'), "/about");

    let subMenu: Link[] = [];
    AddLink(subMenu, ($t as any)('source.title'), "/source");
    AddLink(subMenu, ($t as any)('printing.title'), "/printing");
    AddLink(subMenu, ($t as any)('copi.title'), "/copi");
    AddLink(subMenu, ($t as any)('swags.title'), "/swags");
    AddLink(subMenu, ($t as any)('webshop.title'), "/webshop");

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'es', label: 'Espanol' },
        { code: 'fr', label: 'Francais' },
        { code: 'pt', label: 'Portugues' },
        { code: 'ja', label: 'Japanese' },
    ];

    function isActive(href: string): boolean {
        if (href === '/') return $page.url.pathname === '/';
        return $page.url.pathname.startsWith(href);
    }
</script>

<header id="main-header">
    <!-- Hidden checkbox controls mobile menu via CSS -->
    <input type="checkbox" id="menu-toggle" class="menu-toggle-input" aria-hidden="true" />
    <input type="checkbox" id="lang-toggle" class="lang-toggle-input" aria-hidden="true" />

    <nav aria-label="Main navigation">
        <a class="logo" href="/" aria-label="OWASP Cornucopia Home">
            <img src="/images/cornucopia_logo_white.svg" alt="OWASP Cornucopia" class="logo-img" />
        </a>

        <ul class="desktop-menu" role="list">
            {#each mainMenu as link}
                <li>
                    <a
                        class="nav-link"
                        class:active={isActive(link.href)}
                        href={link.href}
                        aria-current={isActive(link.href) ? 'page' : undefined}
                    >
                        {link.name}
                    </a>
                </li>
            {/each}

            <li class="dropdown-wrap">
                <input type="checkbox" id="sub-toggle" class="sub-toggle-input" aria-hidden="true" />
                <label for="sub-toggle" class="nav-link get-game-btn">
                    {($t as any)('getthegame.title')} v
                </label>
                <ul class="dropdown-menu" role="menu">
                    {#each subMenu as link}
                        <li role="none">
                            <a class="dropdown-item" href={link.href} role="menuitem">
                                {link.name}
                            </a>
                        </li>
                    {/each}
                </ul>
            </li>
        </ul>

        <div class="nav-right">
            <div class="lang-wrap">
                <label for="lang-toggle" class="lang-btn" aria-label="Select language">
                    [LANG] <span class="lang-code">{($lang as any || 'en').toUpperCase()}</span>
                </label>
                <ul class="lang-dropdown" role="listbox" aria-label="Available languages">
                    {#each languages as l}
                        <li
                            role="option"
                            aria-selected={($lang as any || 'en') === l.code}
                            class:selected={($lang as any || 'en') === l.code}
                        >
                            <a href="/{l.code}" class="lang-option">
                                {l.label}
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>

            <a class="cta-btn desktop-only" href="/copi">Play Online</a>

            <label
                for="menu-toggle"
                class="hamburger mobile-only"
                aria-label="Toggle menu"
               
                tabindex="0"
            >
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </label>
        </div>
    </nav>

    <!-- Mobile backdrop -->
    <label for="menu-toggle" class="backdrop" aria-hidden="true"></label>

    <!-- Mobile drawer -->
    <nav id="mobile-drawer" class="mobile-drawer" aria-label="Mobile navigation">
        <div class="drawer-header">
            <img src="/images/cornucopia_logo_white.svg" alt="OWASP Cornucopia" class="drawer-logo" />
            <span class="drawer-title">Menu</span>
            <label for="menu-toggle" class="close-btn" tabindex="0">X</label>
        </div>

        <ul class="drawer-links" role="list">
            {#each mainMenu as link}
                <li>
                    <a
                        class="drawer-link"
                        class:active={isActive(link.href)}
                        href={link.href}
                        aria-current={isActive(link.href) ? 'page' : undefined}
                    >
                        {link.name}
                    </a>
                </li>
            {/each}
        </ul>

        <div class="drawer-divider" aria-hidden="true"></div>
        <div class="drawer-section-label">{($t as any)('getthegame.title')}</div>
        <ul class="drawer-links" role="list">
            {#each subMenu as link}
                <li>
                    <a class="drawer-link sub" href={link.href}>
                        {link.name}
                    </a>
                </li>
            {/each}
        </ul>

        <div class="drawer-divider" aria-hidden="true"></div>
        <div class="drawer-section-label">Language</div>
        <ul class="drawer-lang-list" role="listbox">
            {#each languages as l}
                <li role="option" aria-selected={($lang as any || 'en') === l.code}>
                    <a
                        href="/{l.code}"
                        class="drawer-lang-option"
                        class:selected={($lang as any || 'en') === l.code}
                    >
                        {l.label}
                    </a>
                </li>
            {/each}
        </ul>

        <div class="drawer-cta">
            <a class="cta-btn full" href="/copi">Play Online</a>
        </div>
    </nav>
</header>

<style>
    * { box-sizing: border-box; margin: 0; padding: 0; }

    /* Hide checkboxes */
    .menu-toggle-input,
    .lang-toggle-input,
    .sub-toggle-input { display: none; }

    header {
        position: sticky;
        top: 0;
        width: 100%;
        z-index: 200;
        background-color: rgb(31, 41, 55);
        border-bottom: 1px solid rgba(255,255,255,0.15);
    }

    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 4rem;
        padding: 0 1.5rem;
        gap: 1rem;
    }

    .logo { display: flex; align-items: center; text-decoration: none; flex-shrink: 0; }
    .logo-img { height: 2.5rem; width: auto; }
    .drawer-logo { height: 1.8rem; width: auto; }

    .desktop-menu {
        display: flex;
        align-items: center;
        list-style: none;
        gap: 0.25rem;
        flex: 1;
        justify-content: center;
    }

    .nav-link {
        color: rgba(255,255,255,0.8);
        text-decoration: none;
        font-size: 0.85rem;
        font-weight: 500;
        padding: 0.4rem 0.75rem;
        border-radius: 5px;
        transition: all 0.15s ease;
        white-space: nowrap;
        cursor: pointer;
        display: block;
    }
    .nav-link:hover { color: white; background: rgba(255,255,255,0.1); }
    .nav-link.active { color: #fb923c; background: rgba(232,93,4,0.15); }

    /* Dropdown */
    .dropdown-wrap { position: relative; list-style: none; }
    .get-game-btn { border: 1px solid rgba(255,255,255,0.3); }
    .get-game-btn:hover { border-color: white; }

    .dropdown-menu {
        display: none;
        position: absolute;
        top: calc(100% + 0.5rem);
        left: 50%;
        transform: translateX(-50%);
        background: rgb(31,41,55);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 8px;
        list-style: none;
        min-width: 160px;
        padding: 0.4rem 0;
        z-index: 300;
        box-shadow: 0 8px 24px rgba(0,0,0,0.4);
    }
    .sub-toggle-input:checked ~ .dropdown-menu { display: block; }
    .dropdown-wrap:hover .dropdown-menu { display: block; }

    .dropdown-item {
        display: block;
        padding: 0.5rem 1rem;
        color: rgba(255,255,255,0.8);
        text-decoration: none;
        font-size: 0.85rem;
        transition: all 0.15s;
    }
    .dropdown-item:hover { background: rgba(255,255,255,0.08); color: white; }

    /* Nav right */
    .nav-right { display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0; }
    .lang-wrap { position: relative; }

    .lang-btn {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 5px;
        color: rgba(255,255,255,0.85);
        font-size: 0.8rem;
        padding: 0.35rem 0.7rem;
        cursor: pointer;
        transition: all 0.15s;
        min-height: 44px;
    }
    .lang-btn:hover { background: rgba(255,255,255,0.15); }
    .lang-code { font-weight: 600; font-size: 0.75rem; }

    .lang-dropdown {
        display: none;
        position: absolute;
        top: calc(100% + 0.4rem);
        right: 0;
        background: rgb(31,41,55);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 8px;
        list-style: none;
        min-width: 150px;
        padding: 0.4rem 0;
        z-index: 300;
        box-shadow: 0 8px 24px rgba(0,0,0,0.4);
    }
    .lang-toggle-input:checked ~ nav .lang-wrap .lang-dropdown { display: block; }
    .lang-wrap:hover .lang-dropdown { display: block; }

    .lang-option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        color: rgba(255,255,255,0.8);
        text-decoration: none;
        font-size: 0.85rem;
        transition: all 0.15s;
    }
    .lang-option:hover { background: rgba(255,255,255,0.08); color: white; }
    li.selected .lang-option { color: #7dd3fc; }

    .cta-btn {
        background: #e85d04;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 0.45rem 1rem;
        font-size: 0.85rem;
        font-weight: 600;
        cursor: pointer;
        text-decoration: none;
        white-space: nowrap;
        transition: background 0.15s;
        min-height: 44px;
        display: flex;
        align-items: center;
    }
    .cta-btn:hover { background: #c44e03; }
    .cta-btn.full { width: 100%; justify-content: center; font-size: 0.95rem; padding: 0.75rem; }

    /* Hamburger */
    .hamburger {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
        background: none;
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 6px;
        padding: 0.5rem;
        cursor: pointer;
        min-width: 44px;
        min-height: 44px;
        align-items: center;
    }

    .bar {
        display: block;
        width: 20px;
        height: 2px;
        background: white;
        border-radius: 2px;
        transition: all 0.25s ease;
        transform-origin: center;
    }

    /* Hamburger X animation when checked */
    .menu-toggle-input:checked ~ nav .hamburger .bar:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .menu-toggle-input:checked ~ nav .hamburger .bar:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .menu-toggle-input:checked ~ nav .hamburger .bar:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

    /* Backdrop */
    .backdrop {
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.55);
        z-index: 250;
        cursor: pointer;
    }
    .menu-toggle-input:checked ~ .backdrop { display: block; }

    /* Mobile drawer */
    .mobile-drawer {
        position: fixed;
        top: 0; left: 0;
        width: 280px;
        height: 100vh;
        background: rgb(20,28,42);
        border-right: 1px solid rgba(255,255,255,0.1);
        z-index: 300;
        overflow-y: auto;
        padding-bottom: 2rem;
        transform: translateX(-100%);
        transition: transform 0.25s ease;
        display: block;
    }
    .menu-toggle-input:checked ~ .mobile-drawer { transform: translateX(0); }

    .drawer-header {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        padding: 1rem 1rem 0.75rem;
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .drawer-title { font-size: 0.9rem; font-weight: 600; color: white; flex: 1; }

    .close-btn {
        color: rgba(255,255,255,0.5);
        font-size: 1.1rem;
        cursor: pointer;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        min-width: 44px; min-height: 44px;
        display: flex; align-items: center; justify-content: center;
    }
    .close-btn:hover { color: white; background: rgba(255,255,255,0.08); }

    .drawer-links { list-style: none; padding: 0.5rem 0; }

    .drawer-link {
        display: block; width: 100%;
        padding: 0.75rem 1.25rem;
        color: rgba(255,255,255,0.75);
        font-size: 0.95rem;
        text-decoration: none;
        transition: all 0.15s; min-height: 44px;
    }
    .drawer-link:hover { background: rgba(255,255,255,0.06); color: white; }
    .drawer-link.active { color: #fb923c; background: rgba(232,93,4,0.12); border-left: 3px solid #e85d04; padding-left: calc(1.25rem - 3px); }
    .drawer-link.sub { font-size: 0.85rem; padding-left: 1.5rem; color: rgba(255,255,255,0.55); }

    .drawer-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 0.5rem 0; }

    .drawer-section-label {
        font-size: 0.7rem; text-transform: uppercase;
        letter-spacing: 0.1em; color: rgba(255,255,255,0.35);
        padding: 0.5rem 1.25rem 0.25rem; font-weight: 600;
    }

    .drawer-lang-list { list-style: none; padding: 0.25rem 0; }

    .drawer-lang-option {
        display: flex; align-items: center; gap: 0.6rem;
        padding: 0.6rem 1.25rem;
        color: rgba(255,255,255,0.7);
        text-decoration: none; font-size: 0.9rem;
        transition: all 0.15s; min-height: 44px;
    }
    .drawer-lang-option:hover { background: rgba(255,255,255,0.06); color: white; }
    .drawer-lang-option.selected { color: #7dd3fc; }

    .drawer-cta { padding: 1rem 1.25rem 0.5rem; }

    .desktop-only { display: flex; }
    .mobile-only { display: none; }

    @media (max-width: 768px) {
        .desktop-menu { display: none; }
        .desktop-only { display: none; }
        .mobile-only { display: flex; }
        nav { padding: 0 1rem; }
    }

    @media (min-width: 769px) and (max-width: 1024px) {
        .desktop-menu { display: flex; }
        .nav-link { font-size: 0.78rem; padding: 0.4rem 0.5rem; }
        .mobile-only { display: none; }
    }
</style>
