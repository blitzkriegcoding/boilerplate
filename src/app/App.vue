<template>
  <div id="app" class="container">
    <md-whiteframe class="main-header">
      <md-toolbar class="md-large">
        <div class="page-wrapper">
          <div class="md-toolbar-container">
            <md-button class="main-menu-trigger md-icon-button" @click.native="toggleSidenav">
              <md-icon md-src="assets/icon-menu.svg" />
            </md-button>

            <md-icon md-src="assets/icon-github.svg" />

            <h1 class="md-title md-flex">Vue Material</h1>

            <nav class="main-navigation">
              <md-button class="md-dense">Pull requests</md-button>
              <md-button class="md-dense">Issues</md-button>
              <md-button class="md-dense">Trending</md-button>
              <md-button class="md-dense">Gist</md-button>
            </nav>
          </div>

          <div class="md-toolbar-container">
            <md-tabs md-theme="alternative" @change="changeTab">
              <md-tab v-for="item in nav" :key="item.url" :md-label="$t(item.label)" />
            </md-tabs>
          </div>
        </div>
      </md-toolbar>
    </md-whiteframe>

    <md-sidenav class="main-sidenav md-left md-fixed" ref="sideNav">
      <md-list>
        <md-list-item v-for="item in nav" :key="item.url">
          <router-link exact :to="item.url">
            <md-icon :md-src="`assets/icon-${item.icon}.svg`" />
            <span>{{ $t(item.label) }}</span>
          </router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>

    <router-view />

    <md-speed-dial md-open="hover" class="md-fab-bottom-right">
      <md-button class="md-fab" md-fab-trigger>
        <md-icon md-icon-morph md-src="assets/icon-code.svg" />
        <md-icon md-src="assets/icon-add.svg" />
      </md-button>

      <md-button class="md-fab md-primary md-mini md-clean">
        <md-icon md-src="assets/icon-note.svg" />
      </md-button>

      <md-button class="md-fab md-primary md-mini md-clean">
        <md-icon md-src="assets/icon-work.svg" />
      </md-button>
    </md-speed-dial>
  </div>
</template>

<style lang="scss">
  @import '~vue-material/src/core/stylesheets/variables.scss';

  html,
  body {
    height: 100%;
    overflow: hidden;
  }

  body {
    display: flex;
  }

  .container {
    min-height: 100%;
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    position: relative;
  }

  .page-wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-flow: column nowrap;
    flex: 1;
    position: relative;
  }

  .main-header {
    position: relative;

    .md-toolbar {
      height: 128px;
      overflow: hidden;

      @media (max-width: 767px) {
        height: 64px;
        min-height: 64px;
      }
    }

    .md-toolbar-container:last-child {
      align-items: flex-end;

      @media (max-width: 767px) {
        display: none;
      }
    }

    .main-menu-trigger {
      @media (min-width: 767px) {
        display: none;
      }

      .md-icon {
        top: 0;
      }
    }

    .md-title {
      @media (min-width: 767px) {
        padding-left: 8px;
      }
    }

    .main-navigation {
      @media (max-width: 767px) {
        display: none;
      }

      .md-button {
        min-width: 0;
        margin: 1px;
        padding-right: 12px;
        padding-left: 12px;
      }
    }

    .md-tabs {
      margin-left: 8px;
    }

    .md-tabs-content {
      display: none;
    }
  }

  .main-sidenav {
    z-index: 4;

    .router-link-exact-active {
      font-weight: 700;
    }
  }

  .md-button.md-fab .md-icon {
    display: flex;
  }
</style>

<script lang="babel">
  export default {
    name: 'app',
    data: () => ({
      nav: [
        {
          url: '/',
          icon: 'panorama',
          label: 'overview.title'
        },
        {
          url: '/repositories',
          icon: 'code',
          label: 'repositories.title'
        },
        {
          url: '/stars',
          icon: 'stars',
          label: 'stars.title'
        },
        {
          url: '/followers',
          icon: 'group',
          label: 'followers.title'
        },
        {
          url: '/following',
          icon: 'favorite',
          label: 'following.title'
        }
      ]
    }),
    methods: {
      toggleSidenav () {
        this.$refs.sideNav.open()
      },
      changeTab (item) {
        const { url } = this.nav[item]

        this.$router.push(url)
      }
    },
    async mounted () {
      await this.$nextTick()

      this.$router.afterEach(() => {
        if (this.$refs.sideNav) {
          this.$refs.sideNav.close()
        }
      })
    }
  }
</script>
