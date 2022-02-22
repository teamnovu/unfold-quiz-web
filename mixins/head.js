export default {

  head () {
    const page = this.$store.getters.page
    if (!page) { return }

    const head = {
      meta: [
        {
          property: 'og:url',
          content: process.env.baseUrl + page.url
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:image',
          content: this.pageImage(page).permalink
        },
        {
          property: 'og:image:alt',
          hid: 'og:image:alt',
          content: this.pageImage(page).alt
        }
      ],

      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: process.env.baseUrl + page.url
        }
      ]
    }

    head.meta.push({
      name: 'twitter:card',
      content: 'summary'
    })

    if (page.seo_hidden) {
      head.meta.push({ hid: 'robots', name: 'robots', content: 'noindex' })
    }

    // TITLE
    if (page.seo_title || page.title) {
      head.meta.push({
        hid: 'title',
        name: 'title',
        content: page.seo_title || page.title
      })
      head.meta.push({
        property: 'og:title',
        content: page.seo_title || page.title
      })
    }

    // DESCRIPTION
    if (page.seo_description || page.description) {
      head.meta.push({
        hid: 'description',
        name: 'description',
        content: page.seo_description || page.description
      })
      head.meta.push({
        property: 'og:description',
        content: page.seo_description || page.description
      })
    }

    return head
  },

  methods: {
    pageImage (page) {
      // seo image
      if (page.seo_image) {
        return page.seo_image
      } else {
        return {
          permalink: undefined,
          alt: undefined
        }
      }
    }
  }
}
