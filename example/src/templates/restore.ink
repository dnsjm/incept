<link rel="import" type="template" href="@stackpress/incept-admin/theme/head.ink" name="html-head" />
<link rel="import" type="component" href="@stackpress/ink-ui/element/icon.ink" name="element-icon" />
<link rel="import" type="component" href="@stackpress/ink-ui/element/crumbs.ink" name="element-crumbs" />
<link rel="import" type="component" href="@stackpress/ink-ui/form/button.ink" name="form-button" />
<link rel="import" type="component" href="@stackpress/.incept/Profile/detail.ink" name="profile-detail" />
<link rel="import" type="component" href="@stackpress/incept-admin/theme/app.ink" name="admin-app" />
<style>
  @ink theme;
  @ink reset;
  @ink fouc-opacity;
  @ink utilities;
</style>
<script>
  import { env, props } from '@stackpress/ink';
  import { _ } from '@stackpress/incept-i18n';

  const { 
    code = 200, 
    status = 'OK', 
    results = {},
    settings = { 
      root: '/admin',
      menu: [], 
      session: { 
        id: 0, 
        token: '', 
        roles: [ 'GUEST' ], 
        permissions: [] 
      }
    }
  } = props('document');
  const url = `${settings.root}/profile/restore/${results.id}`;
  const title = _('Restore Profile');
  const links = {
    search: `${settings.root}/profile/search`,
    detail: `${settings.root}/profile/detail/${results.id}`,
    restore: `${url}?confirmed=true`
  };
  const crumbs = [
    { icon: 'home', label: 'Home', href: settings.root },
    { icon: 'user', label: _('Profiles'), href: links.search },
    { label: results.suggestion || _('Profile Detail'), href: links.detail },
    { icon: 'arrows-rotate', label: title }
  ];
</script>
<html>
  <html-head />
  <body class="relative dark bg-t-0 tx-t-1 tx-arial">
    <admin-app {settings} {url} {title} {code} {status}>
      <header class="p-10 bg-t-1">
        <element-crumbs 
          crumbs={crumbs} 
          block 
          bold 
          white 
          icon-muted
          link-primary
          spacing={2}
        />
      </header>
      <main class="flex-grow p-10 scroll-auto h-calc-full-38">
        <h1>{title}</h1>
        <div class="pb-50">
          <p class="py-20">{_(
            'Are you sure you want to restore %s?', 
            results.suggestion
          )}</p>
          <form-button lg success href={links.restore}>
            <element-icon name="arrows-rotate" class="mr-5" />
            {_('Yes, Restore')}
          </form-button>
          <form-button lg info href={links.detail}>
            <element-icon name="backward" class="mr-5" />
            {_('Nevermind')}
          </form-button>
        </div>
      </main>
    </admin-app>
  </body>
</html>