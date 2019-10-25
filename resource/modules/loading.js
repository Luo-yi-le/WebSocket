export  const loadingShow=function (that) {
    that.$Spin.show({
        render: (h) => {
            return h('div', [
                h('Icon', {
                    'class': 'loading',
                    props: {
                        type: 'ios-loading',
                        size: 45
                    }
                }),
                h('div', 'Loading')
            ])
        }
    });
};
export  const loadingHide=function (that) {
    that.$Spin.hide();
};