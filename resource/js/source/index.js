var token = localStorage.getItem("dnc_token");
if (!token) {
	window.location.href = "login.html";
}
Vue.prototype.$Message.config({
	top: 10,
	duration: 3
});
var vm = new Vue({
	el: '#app',
	data: {
		windowHeight: 0,
		frameHeight: 0,
		menuState: {
			openMenus: [],
			height: 300
		},
		tab: {
			type: "line" //可选值:line,card
		},
		currentTab: {
			index: 0,
			name: "",
			closable: true
		},
		isCollapsed: false,
		menu: [],
		tabs: []
	},
	computed: {
		rotateIcon() {
			return [
				'menu-icon',
				this.isCollapsed ? 'rotate-icon' : ''
			];
		},
		menuitemClasses() {
			return [
				'menu-item',
				this.isCollapsed ? 'collapsed-menu' : ''
			];
		},
		mainContentHeight() {
			var docHeight = this.windowHeight - 65;
			return {
				margin: '50px 2px 0',
				background: '#fff',
				height: '100%',
				minHeight: docHeight + 15 + 'px'
			};
		}
	},
	ready: function() {

	},
	beforeDestroy: function() {
		window.removeEventListener('resize', this.handleResize)
	},
	mounted() {
		this.init();
		window.addEventListener('resize', this.handleResize);
		this.handleMenuClick({
			label: "首页",
			name: "1-0",
			href: "./pages/default.html",
			icon: "md-home",
			closable: false
		});

	},
	methods: {
		init: function() {
			this.calcFrameHeight();
			this.calcSiderMenuHeight();
		},
		calcFrameHeight: function() {
			this.windowHeight = (document.documentElement.scrollHeight || document.body.scrollHeight);
			this.frameHeight = this.windowHeight - 95;
		},
		calcSiderMenuHeight: function() {
			this.menuState.height = this.windowHeight - 50;
		},
		setCurrentTab: function(name) {
			var tab = this.getTab(name);
			var tabIndex = this.getTabIndex(name);
			if (tab) {
				this.currentTab.index = tabIndex;
				this.currentTab.name = tab.name;
				this.currentTab.closable = tab.closable;
			}
		},
		handleMenuClick(menu) {
			var tab = {
				label: menu.label,
				href: menu.href,
				icon: menu.icon,
				name: menu.name,
				closable: menu.closable
			};
			if (this.tabs.map(x => x.name).indexOf(menu.name) === -1) {
				this.tabs.push(tab);
			}
			this.setCurrentTab(tab.name);
		},
		handleMenuSelected(name) {
			var menu = this.menu.menuItem;
		},
		collapsedSider() {
			this.$refs.side1.toggleCollapse();
		},
		getTab: function(name) {
			for (var i = 0; i < this.tabs.length; i++) {
				if (this.tabs[i].name == name) {
					return this.tabs[i];
				}
			}
			return null;
		},
		getTabIndex: function(name) {
			for (var i = 0; i < this.tabs.length; i++) {
				if (this.tabs[i].name == name) {
					return i;
				}
			}
			return -1;
		},
		handleTabClicked: function(name) {
			this.setCurrentTab(name);
			var openNames = name.split("-")[0] + "";
			this.menuState.openNames = [openNames];
			this.$nextTick(function() {
				this.$refs["myMenu"].updateOpened();
			});
		},
		handleTabRemoved: function(name) {
			var index = this.getTabIndex(name);
			this.doRemoveTab(index);
		},
		handleResize: function() {
			this.calcFrameHeight();
			this.calcSiderMenuHeight();
		},
		handleTabDropdownClick: function(name) {
			switch (name) {
				case "close-all":
					this.doCloseTabAll();
					break;
				case "close-current":
					this.doCloseTabCurrent();
					break;
				case "close-others":
					this.doCloseTabOthers();
					break;
				case "switch-tab-type":
					this.handleSwitchTabType();
					break;
			}
		},
		doRemoveTab: function(index) {
			var tab = this.tabs[index];
			if (!tab.closable) {
				return;
			}
			this.tabs.splice(index, 1);
		},
		doCloseTabAll: function() {
			for (var i = this.tabs.length - 1; i >= 0; i--) {
				var tab = this.tabs[i];
				if (tab.closable) {
					this.doRemoveTab(i);
				}
			}
			if (this.currentTab.closable) {
				var index = this.tabs.length - 1;
				this.currentTab.index = index;
				this.currentTab.name = this.tabs[index].name;
				this.currentTab.closable = this.tabs[index].closable;
			}
			var target = this;
			setTimeout(function() {
				target.resetActiveTab();
			}, 50);
		},
		doCloseTabCurrent: function() {
			this.handleTabRemoved(this.currentTab.name);
			var index = this.currentTab.index - 1;
			if (index < 0) {
				index = 0;
			}
			if (this.currentTab.closable) {
				this.currentTab.index = index;
				this.currentTab.name = this.tabs[index].name;
				this.currentTab.closable = this.tabs[index].closable;
			}
			var target = this;
			setTimeout(function() {
				target.resetActiveTab();
			}, 50);
		},
		doCloseTabOthers: function() {
			var previousRemoveCount = 0;
			var count = true;
			for (var i = this.tabs.length - 1; i >= 0; i--) {
				var tab = this.tabs[i];
				if (tab.closable && tab.name != this.currentTab.name) {
					this.doRemoveTab(i);
				}
				if (tab.closable && count) {
					previousRemoveCount++;
					if (tab.name == this.currentTab.name) {
						count = false;
					}
				}
			}
			if (previousRemoveCount > 0) {
				this.currentTab.index = this.getTabIndex(this.currentTab.name);
			}
		},
		resetActiveTab: function() {
			var target = this;
			setTimeout(function() {
				var name = target.currentTab.name;
				target.setCurrentTab(name);
				target.handleTabClicked(name);
			}, 100);

		},
		handleSwitchTabType: function() {
			this.tab.type = this.tab.type === "line" ? "card" : "line";
		},
		findNextTabIndex: function() {
			var index = this.currentTab.index - 1;
			if (index < 0) {
				index = 0;
			}
			return index;
		},
		findNextTabName: function() {
			var index = this.findNextTabIndex();
			return this.tabs[index].name;
		},
		findNextTab: function() {
			var index = this.findNextTabIndex();
			return this.tabs[index];
		},
		getMenuList: function() {
			const that = this;
			$.ajax({
				url: "http://192.168.60.107:8080/json/menu/Menu_sotl.json",
				type: "Get",
				dataType: "json",
				success: function(res, xhr, req) {
					that.menu = res;
				}
			})
		}
	},
	created() {
		this.getMenuList();
	}
});
