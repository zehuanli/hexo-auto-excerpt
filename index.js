const htmlToText = require('html-to-text');
(function(){
    const sanitize = function (post) {
        const content = htmlToText.fromString(
            post,
            {
                ignoreImage: true,
                ignoreHref: true,
                wordwrap: false,
                uppercaseHeadings: false
            }
        );
        return content;
    }

    hexo.extend.filter.register('after_post_render', function (data) {
        // Return original post data if an excerpt has already been generated, to support <!--more--> tag
        if (data.excerpt) {
            // Tweak
            data.excerpt = data.excerpt.replace(/&amp;/g, '&amp;amp;');
            return data;
        }
        const excerptLength = hexo.config.excerpt_length || 300;
        // Tweak
        const post = sanitize(data.content.replace(/&(amp;)*lt;/g, '<'));
        const excerpt = post.substr(0, excerptLength);
        data.excerpt = excerpt;
        return data;
    });
})();
