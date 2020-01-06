const pageObserve = function(observeItem, callback, that) {
    let hasObserveItem = [];
    // 支持IntersectionObserver
    if (window.IntersectionObserver) {
        let observer = new IntersectionObserver(function(entries) {
            entries.forEach((entry, index) => {
                // 这段逻辑，是每一个被观察的楼层进入视窗时都会触发的
                if (entry.isIntersecting) {
                    var hasObserveName = entry.target.getAttribute('id');
                    if (hasObserveItem.indexOf(hasObserveName) === -1) {
                        hasObserveItem.push(hasObserveName);
                        observeItem.find('img.lazyPic') && observeItem.find('img.lazyPic').each(function(i) {
                            $(this).attr('src', $(this).attr('data-original'));
                        });
                        observeItem.attr("state", "done");
                        callback && callback(that);
                    }
                    observer.unobserve(entry.target)
                }
            })
        }, {
            root: null, // 默认根节点是视口
            rootMargin: '0px',
            threshold: 0 // 全部进入视口才被观察  这个阈值介于0和1之间
        });
        observeItem.forEach(item => {
            observer.observe(item) // 观察每一个进入视口的区域
        })
    } else {
        // 不支持IntersectionObserver
        observeItem.find('img.lazyPic') && observeItem.find('img.lazyPic').each(function(i) {
            $(this).attr('src', $(this).attr('data-original'));
        })
        observeItem.attr("state", "done");
        callback && callback(that);
    }
}

export {
    pageObserve
}