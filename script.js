(function() {
		"use strict";
		// ---------- FONT AWESOME ICONS LIST ----------
		const FA_ICONS = ['fab fa-github', 'fab fa-gitlab', 'fab fa-bitbucket', 'fab fa-google', 'fab fa-youtube', 'fab fa-twitter', 'fab fa-instagram', 'fab fa-facebook', 'fab fa-linkedin', 'fab fa-discord', 'fab fa-slack', 'fab fa-telegram', 'fab fa-whatsapp', 'fab fa-reddit', 'fab fa-spotify', 'fab fa-apple', 'fab fa-android', 'fab fa-windows', 'fab fa-linux', 'fab fa-ubuntu', 'fab fa-chrome', 'fab fa-firefox', 'fab fa-edge', 'fab fa-safari', 'fas fa-code', 'fas fa-terminal', 'fas fa-database', 'fas fa-cloud', 'fas fa-server', 'fas fa-shield', 'fas fa-lock', 'fas fa-key', 'fas fa-user', 'fas fa-users', 'fas fa-cog', 'fas fa-cogs', 'fas fa-home', 'fas fa-search', 'fas fa-star', 'fas fa-heart', 'fas fa-bell', 'fas fa-envelope', 'fas fa-calendar', 'fas fa-clock', 'fas fa-map', 'fas fa-camera', 'fas fa-video', 'fas fa-music', 'fas fa-gamepad', 'fas fa-shopping-cart', 'fas fa-credit-card', 'fas fa-robot', 'fas fa-brain', 'fas fa-fire', 'fas fa-play', 'fab fa-codepen', 'fas fa-cloud-upload-alt'];
		// ---------- DEFAULT DIALS with colors ----------
		const DEFAULT_DIALS = [{
			icon: 'fab fa-github',
			label: "GitHub",
			url: "https://github.com/Ron015",
			iconType: 'fa',
			iconSource: 'picker',
			iconColor: 1
		}, {
			icon: 'fas fa-cloud',
			label: "Render",
			url: "https://dashboard.render.com/",
			iconType: 'fa',
			iconSource: 'picker',
			iconColor: 2
		}, {
			icon: 'fas fa-play',
			label: "Vercel",
			url: "https://vercel.com",
			iconType: 'fa',
			iconSource: 'picker',
			iconColor: 3
		}, {
			icon: 'fas fa-robot',
			label: "ChatGPT",
			url: "https://chat.openai.com",
			iconType: 'fa',
			iconSource: 'picker',
			iconColor: 4
		}, {
			icon: 'fas fa-brain',
			label: "DeepSeek",
			url: "https://chat.deepseek.com",
			iconType: 'fa',
			iconSource: 'picker',
			iconColor: 5
		}, {
			icon: 'fas fa-comment',
			label: "Grok",
			url: "https://grok.x.ai",
			iconType: 'fa',
			iconSource: 'picker',
			iconColor: 6
		}, {
			icon: 'fas fa-fire',
			label: "Firebase",
			url: "https://console.firebase.google.com",
			iconType: 'fa',
			iconSource: 'picker',
			iconColor: 7
		}, {
			icon: 'fab fa-codepen',
			label: "CodePen",
			url: "https://codepen.io",
			iconType: 'fa',
			iconSource: 'picker',
			iconColor: 8
		}];
		const DEFAULT_COLORS = {
			primary: '#00d4ff',
			secondary: '#7b2ff7',
			tertiary: '#ff006e',
			icon1: '#00d4ff',
			icon2: '#7b2ff7',
			icon3: '#ff006e',
			icon4: '#51cf66',
			icon5: '#ffd43b',
			icon6: '#ff6b6b',
			icon7: '#cc5de8',
			icon8: '#4dabf7'
		};
		const DEFAULT_BG = {
			type: 'gradient',
			gradient: {
				g1: '#0a0e27',
				g2: '#1a0b2e',
				g3: '#0d1117'
			},
			image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
			opacity: 0.3
		};
		// ---------- STATE ----------
		let dials = [];
		let editMode = false;
		let editingIndex = -1;
		let colors = {
			...DEFAULT_COLORS
		};
		let bgSettings = {
			...DEFAULT_BG
		};
		let selectedIcon = 'fab fa-github';
		let selectedIconType = 'fa';
		let selectedIconSource = 'picker';
		let selectedIconColor = 1;
		let customIconClass = '';
		// DOM Elements
		const dialsGrid = document.getElementById('dialsGrid');
		const editToggle = document.getElementById('editToggle');
		const editIndicator = document.getElementById('editIndicator');
		const addDialBtn = document.getElementById('addDialBtn');
		const editModal = document.getElementById('editModal');
		const modalTitle = document.getElementById('modalTitle');
		const modalName = document.getElementById('modalName');
		const modalUrl = document.getElementById('modalUrl');
		const modalIcon = document.getElementById('modalIcon');
		const faIconPicker = document.getElementById('faIconPicker');
		const customIconInput = document.getElementById('customIconInput');
		const iconPreview = document.getElementById('iconPreview');
		const iconColorSelect = document.getElementById('iconColorSelect');
		const modalCancel = document.getElementById('modalCancel');
		const modalSave = document.getElementById('modalSave');
		const bgToggle = document.getElementById('bgToggle');
		const bgPanel = document.getElementById('bgPanel');
		const colorToggle = document.getElementById('colorToggle');
		const colorPanel = document.getElementById('colorPanel');
		const primaryColor = document.getElementById('primaryColor');
		const secondaryColor = document.getElementById('secondaryColor');
		const tertiaryColor = document.getElementById('tertiaryColor');
		const iconColorPicker = document.getElementById('iconColorPicker');
		const resetColorsBtn = document.getElementById('resetColorsBtn');
		const searchInput = document.getElementById('searchInput');
		const searchBtn = document.getElementById('searchBtn');
		const bgGradient = document.getElementById('bgGradient');
		const bgImage = document.getElementById('bgImage');
		const imageUrlInput = document.getElementById('imageUrlInput');
		const applyImageBtn = document.getElementById('applyImageBtn');
		const opacitySlider = document.getElementById('opacitySlider');
		const faSourceToggle = document.getElementById('faSourceToggle');
		// Popups
		const historyPopup = document.getElementById('historyPopup'),
			bookmarksPopup = document.getElementById('bookmarksPopup');
		const downloadsPopup = document.getElementById('downloadsPopup'),
			ipPopup = document.getElementById('ipPopup');
		const historyList = document.getElementById('historyList'),
			bookmarksList = document.getElementById('bookmarksList'),
			downloadsList = document.getElementById('downloadsList');
		const ipAddressSpan = document.getElementById('ipAddress'),
			refreshIpBtn = document.getElementById('refreshIpBtn');
		// ---------- LOCALSTORAGE ----------
		function loadData() {
			try {
				const savedDials = localStorage.getItem('void_dials_v7');
				if(savedDials) {
					dials = JSON.parse(savedDials);
				} else {
					dials = [...DEFAULT_DIALS];
				}
				const savedColors = localStorage.getItem('void_colors_v4');
				if(savedColors) colors = {
					...DEFAULT_COLORS,
					...JSON.parse(savedColors)
				};
				const savedBg = localStorage.getItem('void_bg_v3');
				if(savedBg) bgSettings = {
					...DEFAULT_BG,
					...JSON.parse(savedBg)
				};
			} catch (e) {
				dials = [...DEFAULT_DIALS];
			}
			applyColors();
			applyBackground();
			updateColorInputs();
			updateIconColorDots();
		}

		function saveDials() {
			localStorage.setItem('void_dials_v7', JSON.stringify(dials));
		}

		function saveColors() {
			localStorage.setItem('void_colors_v4', JSON.stringify(colors));
		}

		function saveBg() {
			localStorage.setItem('void_bg_v3', JSON.stringify(bgSettings));
		}
		// ---------- BACKGROUND SYSTEM ----------
		function applyBackground() {
			const root = document.documentElement;
			if(bgSettings.type === 'gradient') {
				const g = bgSettings.gradient;
				root.style.setProperty('--bg-gradient-1', g.g1);
				root.style.setProperty('--bg-gradient-2', g.g2);
				root.style.setProperty('--bg-gradient-3', g.g3);
				bgGradient.style.opacity = '1';
				bgImage.classList.remove('active');
			} else {
				if(bgSettings.image) {
					root.style.setProperty('--bg-image-url', `url('${bgSettings.image}')`);
				}
				root.style.setProperty('--bg-opacity', bgSettings.opacity);
				bgImage.classList.add('active');
			}
		}

		function updateBgUI() {
			document.querySelectorAll('[data-bg-type]').forEach(opt => {
				opt.classList.toggle('active', opt.dataset.bgType === bgSettings.type);
			});
			if(bgSettings.type === 'gradient') {
				document.getElementById('gradientOptions').style.display = 'block';
				document.getElementById('imageOptions').style.display = 'none';
			} else {
				document.getElementById('gradientOptions').style.display = 'none';
				document.getElementById('imageOptions').style.display = 'block';
				imageUrlInput.value = bgSettings.image || '';
				opacitySlider.value = bgSettings.opacity;
			}
		}
		// ---------- COLOR SYSTEM ----------
		function applyColors() {
			const root = document.documentElement;
			root.style.setProperty('--accent-primary', colors.primary);
			root.style.setProperty('--accent-secondary', colors.secondary);
			root.style.setProperty('--accent-tertiary', colors.tertiary);
			root.style.setProperty('--border-glow', colors.primary + '33');
			for(let i = 1; i <= 8; i++) {
				root.style.setProperty(`--icon-color-${i}`, colors['icon' + i]);
			}
		}

		function updateColorInputs() {
			primaryColor.value = colors.primary;
			secondaryColor.value = colors.secondary;
			tertiaryColor.value = colors.tertiary;
		}

		function updateIconColorDots() {
			// Update panel dots
			document.querySelectorAll('[data-icon-color]').forEach((dot) => {
				const colorNum = dot.dataset.iconColor;
				if(colorNum) {
					dot.style.background = colors['icon' + colorNum];
				}
			});
			// Update modal dots
			document.querySelectorAll('[data-fa-color]').forEach((dot) => {
				const colorNum = dot.dataset.faColor;
				if(colorNum) {
					dot.style.background = colors['icon' + colorNum];
				}
			});
		}
		// ---------- RENDER ICON PICKER ----------
		function renderIconPicker() {
			let html = '';
			FA_ICONS.forEach(icon => {
				const isSelected = selectedIcon === icon && selectedIconSource === 'picker';
				html += `<div class="icon-option ${isSelected ? 'selected' : ''}" data-icon="${icon}"><i class="${icon}"></i></div>`;
			});
			faIconPicker.innerHTML = html;
			document.querySelectorAll('.icon-option').forEach(opt => {
				opt.addEventListener('click', () => {
					document.querySelectorAll('.icon-option').forEach(o => o.classList.remove('selected'));
					opt.classList.add('selected');
					selectedIcon = opt.dataset.icon;
					selectedIconSource = 'picker';
					updateIconPreview();
				});
			});
		}

		function updateIconPreview() {
			const colorVar = colors['icon' + selectedIconColor];
			if(selectedIconType === 'fa') {
				const iconClass = selectedIconSource === 'picker' ? selectedIcon : customIconInput.value;
				if(iconClass) {
					iconPreview.innerHTML = `<i class="${iconClass}" style="color: ${colorVar};"></i>`;
				} else {
					iconPreview.innerHTML = `<i class="fas fa-question" style="color: ${colorVar};"></i>`;
				}
			} else {
				const emoji = modalIcon.value || '😊';
				iconPreview.innerHTML = `<span style="font-size: 32px;">${emoji}</span>`;
			}
		}
		// ---------- RENDER DIALS ----------
		function renderDials() {
			let html = '';
			dials.forEach((dial, index) => {
				let iconHtml;
				if(dial.iconType === 'fa') {
					const colorIndex = dial.iconColor || 1;
					const colorVar = colors['icon' + colorIndex];
					iconHtml = `<i class="${dial.icon}" style="color: ${colorVar};"></i>`;
				} else {
					iconHtml = `<span style="font-size: 28px;">${dial.icon}</span>`;
				}
				html += `
                        <div class="dial-card" data-index="${index}" data-url="${dial.url}">
                            <span class="dial-icon">${iconHtml}</span>
                            <span class="dial-label">${dial.label}</span>
                            <div class="delete-badge" data-delete="${index}">✕</div>
                        </div>
                    `;
			});
			dialsGrid.innerHTML = html;
			document.querySelectorAll('.dial-card').forEach(card => {
				card.addEventListener('click', (e) => {
					const deleteBtn = e.target.closest('.delete-badge');
					if(deleteBtn) {
						e.stopPropagation();
						if(editMode) {
							const idx = deleteBtn.dataset.delete;
							if(idx !== undefined) deleteDial(parseInt(idx));
						}
						return;
					}
					if(editMode) {
						const idx = card.dataset.index;
						if(idx !== undefined) openEditModal(parseInt(idx));
					} else {
						const url = card.dataset.url;
						if(url) window.location.href = url;
					}
				});
			});
		}

		function deleteDial(index) {
			if(index >= 0 && index < dials.length) {
				dials.splice(index, 1);
				saveDials();
				renderDials();
			}
		}
		// ----- POPUP HANDLERS (Chrome APIs via background) -----
        
        function loadHistoryPopup() {
        	chrome.runtime.sendMessage({ type: "history" }, (results) => {
        
        		if (!results || results.length === 0) {
        			historyList.innerHTML = '<li>No history</li>';
        			return;
        		}
        
        		let html = '';
        		results.forEach(item => {
        			html += `<li>
        				<i class="fas fa-history"></i> 
        				<a href="${item.url}" target="_blank">
        					${item.title || item.url}
        				</a>
        			</li>`;
        		});
        
        		historyList.innerHTML = html;
        	});
        }
        
        
        function loadBookmarksPopup() {
        	chrome.runtime.sendMessage({ type: "bookmarks" }, (results) => {
        
        		if (!results || results.length === 0) {
        			bookmarksList.innerHTML = '<li>No recent bookmarks</li>';
        			return;
        		}
        
        		let html = '';
        		results.forEach(bm => {
        			html += `<li>
        				<i class="fas fa-star"></i> 
        				<a href="${bm.url}" target="_blank">
        					${bm.title || bm.url}
        				</a>
        			</li>`;
        		});
        
        		bookmarksList.innerHTML = html;
        	});
        }
        
        
        function loadDownloadsPopup() {
        	chrome.runtime.sendMessage({ type: "downloads" }, (results) => {
        
        		if (!results || results.length === 0) {
        			downloadsList.innerHTML = '<li>No downloads</li>';
        			return;
        		}
        
        		let html = '';
        		results.forEach(d => {
        
        			// Try filename first
        			let fileName = '';
        
        			if (d.filename) {
        				fileName = d.filename.split(/[\\/]/).pop();
        			} 
        			// fallback to URL
        			else if (d.url) {
        				fileName = d.url.split('/').pop().split('?')[0];
        			} 
        			// final fallback
        			else {
        				fileName = 'Unknown File';
        			}
        
        			html += `<li>
        				<i class="fas fa-file"></i> 
        				<span>${fileName}</span>
        			</li>`;
        		});
        
        		downloadsList.innerHTML = html;
        	});
        }
		async function fetchIP() {
			try {
				const res = await fetch('https://api.ipify.org?format=json');
				const data = await res.json();
				ipAddressSpan.textContent = data.ip;
			} catch (e) {
				ipAddressSpan.textContent = 'Error fetching IP';
			}
		}

		function openPopup(popup, loader) {
			popup.style.display = 'flex';
			if(loader) loader();
		}

		function openEditModal(index) {
			editingIndex = index;
			const dial = dials[index];
			modalTitle.textContent = 'Edit Shortcut';
			modalName.value = dial.label;
			modalUrl.value = dial.url;
			selectedIconType = dial.iconType || 'fa';
			selectedIconSource = dial.iconSource || 'picker';
			selectedIconColor = dial.iconColor || 1;
			if(selectedIconType === 'fa') {
				selectedIcon = dial.icon;
				customIconClass = dial.iconSource === 'custom' ? dial.icon : '';
			}
			updateIconTypeUI();
			updateIconSourceUI();
			if(selectedIconType === 'fa') {
				modalIcon.style.display = 'none';
				iconColorSelect.style.display = 'block';
				if(selectedIconSource === 'picker') {
					faIconPicker.style.display = 'grid';
					customIconInput.style.display = 'none';
					renderIconPicker();
				} else {
					faIconPicker.style.display = 'none';
					customIconInput.style.display = 'block';
					customIconInput.value = dial.icon;
				}
				// Highlight selected color
				document.querySelectorAll('[data-fa-color]').forEach((dot) => {
					const colorNum = parseInt(dot.dataset.faColor);
					dot.classList.toggle('active', colorNum === selectedIconColor);
				});
			} else {
				modalIcon.style.display = 'block';
				faIconPicker.style.display = 'none';
				customIconInput.style.display = 'none';
				iconColorSelect.style.display = 'none';
				faSourceToggle.style.display = 'none';
				modalIcon.value = dial.icon;
			}
			updateIconPreview();
			editModal.style.display = 'flex';
		}

		function openAddModal() {
			editingIndex = -1;
			modalTitle.textContent = 'Add Shortcut';
			modalName.value = '';
			modalUrl.value = 'https://';
			selectedIconType = 'fa';
			selectedIconSource = 'picker';
			selectedIcon = 'fab fa-github';
			selectedIconColor = 1;
			customIconClass = '';
			updateIconTypeUI();
			updateIconSourceUI();
			modalIcon.style.display = 'none';
			iconColorSelect.style.display = 'block';
			faIconPicker.style.display = 'grid';
			customIconInput.style.display = 'none';
			renderIconPicker();
			modalIcon.value = '😊';
			// Highlight first color
			document.querySelectorAll('[data-fa-color]').forEach((dot) => {
				const colorNum = parseInt(dot.dataset.faColor);
				dot.classList.toggle('active', colorNum === 1);
			});
			updateIconPreview();
			editModal.style.display = 'flex';
		}

		function updateIconTypeUI() {
			document.querySelectorAll('.icon-type-btn').forEach(btn => {
				btn.classList.toggle('active', btn.dataset.iconType === selectedIconType);
			});
			faSourceToggle.style.display = selectedIconType === 'fa' ? 'flex' : 'none';
			iconColorSelect.style.display = selectedIconType === 'fa' ? 'block' : 'none';
		}

		function updateIconSourceUI() {
			document.querySelectorAll('.icon-source-btn').forEach(btn => {
				btn.classList.toggle('active', btn.dataset.source === selectedIconSource);
			});
		}

		function closeModal() {
			editModal.style.display = 'none';
		}

		function saveModal() {
			const name = modalName.value.trim();
			let url = modalUrl.value.trim();
			let icon, iconType, iconSource, iconColor;
			if(selectedIconType === 'fa') {
				iconType = 'fa';
				iconSource = selectedIconSource;
				icon = selectedIconSource === 'picker' ? selectedIcon : customIconInput.value.trim();
				iconColor = selectedIconColor;
				if(!icon) {
					alert('Please select or enter an icon class');
					return;
				}
			} else {
				iconType = 'emoji';
				iconSource = 'emoji';
				icon = modalIcon.value.trim() || '😊';
				iconColor = 1;
			}
			if(!name || !url) return;
			if(!url.match(/^https?:\/\//i)) {
				url = 'https://' + url;
			}
			const newDial = {
				icon,
				label: name,
				url,
				iconType,
				iconSource,
				iconColor
			};
			if(editingIndex >= 0) {
				dials[editingIndex] = newDial;
			} else {
				dials.push(newDial);
			}
			saveDials();
			renderDials();
			closeModal();
		}

		function toggleEditMode() {
			editMode = !editMode;
			document.querySelector('.android-home').classList.toggle('edit-mode', editMode);
			editToggle.innerHTML = editMode ? '<i class="fas fa-check"></i>' : '<i class="fas fa-pen"></i>';
			editIndicator.textContent = editMode ? 'EDIT MODE' : '';
		}
		// ---------- CLOCK ----------
		function updateClock() {
			const now = new Date();
			const hours = String(now.getHours()).padStart(2, '0');
			const minutes = String(now.getMinutes()).padStart(2, '0');
			document.getElementById('timeDisplay').textContent = `${hours}:${minutes}`;
			const options = {
				weekday: 'short',
				month: 'short',
				day: 'numeric'
			};
			document.getElementById('dateDisplay').textContent = now.toLocaleDateString('en-US', options).toUpperCase();
			const hour = now.getHours();
			const greeting = document.getElementById('greetingText');
			if(hour < 12) greeting.textContent = 'GOOD MORNING';
			else if(hour < 18) greeting.textContent = 'GOOD AFTERNOON';
			else greeting.textContent = 'GOOD EVENING';
		}
		// ---------- SEARCH ----------
		function performSearch() {
			let query = searchInput.value.trim();
			if(!query) return;
			if(query.includes('.') && !query.includes(' ')) {
				const url = query.match(/^https?:\/\//i) ? query : 'https://' + query;
				window.location.href = url;
			} else {
				window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query);
			}
		}
		// ---------- INIT ----------
		function init() {
			loadData();
			renderDials();
			updateClock();
			setInterval(updateClock, 1000);
			// Edit mode
			editToggle.addEventListener('click', toggleEditMode);
			addDialBtn.addEventListener('click', openAddModal);
			modalCancel.addEventListener('click', closeModal);
			modalSave.addEventListener('click', saveModal);
			editModal.addEventListener('click', (e) => {
				if(e.target === editModal) closeModal();
			});
			// Icon type toggle
			document.querySelectorAll('.icon-type-btn').forEach(btn => {
				btn.addEventListener('click', () => {
					selectedIconType = btn.dataset.iconType;
					updateIconTypeUI();
					if(selectedIconType === 'fa') {
						modalIcon.style.display = 'none';
						if(selectedIconSource === 'picker') {
							faIconPicker.style.display = 'grid';
							customIconInput.style.display = 'none';
							renderIconPicker();
						} else {
							faIconPicker.style.display = 'none';
							customIconInput.style.display = 'block';
						}
					} else {
						modalIcon.style.display = 'block';
						faIconPicker.style.display = 'none';
						customIconInput.style.display = 'none';
					}
					updateIconPreview();
				});
			});
			// Icon source toggle
			document.querySelectorAll('.icon-source-btn').forEach(btn => {
				btn.addEventListener('click', () => {
					selectedIconSource = btn.dataset.source;
					updateIconSourceUI();
					if(selectedIconSource === 'picker') {
						faIconPicker.style.display = 'grid';
						customIconInput.style.display = 'none';
						renderIconPicker();
					} else {
						faIconPicker.style.display = 'none';
						customIconInput.style.display = 'block';
					}
					updateIconPreview();
				});
			});
			// Custom icon input
			customIconInput.addEventListener('input', updateIconPreview);
			// Emoji input
			modalIcon.addEventListener('input', updateIconPreview);
			// Icon color selection in modal
			document.querySelectorAll('[data-fa-color]').forEach((dot) => {
				dot.addEventListener('click', () => {
					selectedIconColor = parseInt(dot.dataset.faColor);
					document.querySelectorAll('[data-fa-color]').forEach(d => d.classList.remove('active'));
					dot.classList.add('active');
					updateIconPreview();
				});
			});
			// Main icon color dots (in color panel)
			document.querySelectorAll('[data-icon-color]').forEach((dot) => {
				dot.addEventListener('click', () => {
					const colorNum = parseInt(dot.dataset.iconColor);
					document.querySelectorAll('[data-icon-color]').forEach(d => d.classList.remove('active'));
					dot.classList.add('active');
					iconColorPicker.value = colors['icon' + colorNum];
				});
			});
			// Icon color picker
			iconColorPicker.addEventListener('input', () => {
				const color = iconColorPicker.value;
				const activeDot = document.querySelector('[data-icon-color].active');
				if(activeDot) {
					const colorNum = activeDot.dataset.iconColor;
					colors['icon' + colorNum] = color;
					activeDot.style.background = color;
					applyColors();
					saveColors();
					renderDials();
					updateIconPreview();
					// Update modal dots
					document.querySelectorAll('[data-fa-color]').forEach((dot) => {
						const num = dot.dataset.faColor;
						if(num == colorNum) {
							dot.style.background = color;
						}
					});
				}
			});
			// Background panel
			bgToggle.addEventListener('click', () => {
				bgPanel.classList.toggle('show');
				colorPanel.classList.remove('show');
			});
			document.querySelectorAll('[data-bg-type]').forEach(opt => {
				opt.addEventListener('click', () => {
					bgSettings.type = opt.dataset.bgType;
					updateBgUI();
					applyBackground();
					saveBg();
				});
			});
			document.querySelectorAll('.gradient-preset').forEach(preset => {
				preset.addEventListener('click', () => {
					bgSettings.gradient = {
						g1: preset.dataset.g1,
						g2: preset.dataset.g2,
						g3: preset.dataset.g3
					};
					applyBackground();
					saveBg();
				});
			});
			applyImageBtn.addEventListener('click', () => {
				const url = imageUrlInput.value.trim();
				if(url) {
					bgSettings.image = url;
					applyBackground();
					saveBg();
				}
			});
			document.querySelectorAll('.preset-image').forEach(preset => {
				preset.addEventListener('click', () => {
					bgSettings.image = preset.dataset.image;
					imageUrlInput.value = bgSettings.image;
					applyBackground();
					saveBg();
				});
			});
			opacitySlider.addEventListener('input', () => {
				bgSettings.opacity = opacitySlider.value;
				applyBackground();
				saveBg();
			});
			// Color panel
			colorToggle.addEventListener('click', () => {
				colorPanel.classList.toggle('show');
				bgPanel.classList.remove('show');
			});
			primaryColor.addEventListener('input', () => {
				colors.primary = primaryColor.value;
				applyColors();
				saveColors();
			});
			secondaryColor.addEventListener('input', () => {
				colors.secondary = secondaryColor.value;
				applyColors();
				saveColors();
			});
			tertiaryColor.addEventListener('input', () => {
				colors.tertiary = tertiaryColor.value;
				applyColors();
				saveColors();
			});
			resetColorsBtn.addEventListener('click', () => {
				colors = {
					...DEFAULT_COLORS
				};
				applyColors();
				updateColorInputs();
				updateIconColorDots();
				saveColors();
				renderDials();
				document.querySelectorAll('[data-icon-color]').forEach((dot, i) => {
					dot.classList.toggle('active', i === 0);
				});
				iconColorPicker.value = colors.icon1;
			});
			document.querySelectorAll('.preset').forEach(preset => {
				preset.addEventListener('click', () => {
					if(preset.dataset.primary) {
						colors.primary = preset.dataset.primary;
						colors.secondary = preset.dataset.secondary;
						colors.tertiary = preset.dataset.tertiary;
						applyColors();
						updateColorInputs();
						saveColors();
					}
				});
			});
			// Search
			searchBtn.addEventListener('click', performSearch);
			searchInput.addEventListener('keypress', (e) => {
				if(e.key === 'Enter') performSearch();
			});
			// Quick actions -> open popups
			document.querySelectorAll('.action-btn').forEach(btn => {
				btn.addEventListener('click', () => {
					const action = btn.dataset.action;
					if(action === 'history') openPopup(historyPopup, loadHistoryPopup);
					else if(action === 'bookmarks') openPopup(bookmarksPopup, loadBookmarksPopup);
					else if(action === 'downloads') openPopup(downloadsPopup, loadDownloadsPopup);
					else if(action === 'ip') {
						openPopup(ipPopup, fetchIP);
					}
				});
			});
			// Close popups
			document.querySelectorAll('[data-close]').forEach(el => {
				el.addEventListener('click', () => {
					const id = el.dataset.close;
					document.getElementById(id).style.display = 'none';
				});
			});
			[historyPopup, bookmarksPopup, downloadsPopup, ipPopup].forEach(p => p.addEventListener('click', e => {
				if(e.target === p) p.style.display = 'none';
			}));
			refreshIpBtn.addEventListener('click', fetchIP);
			document.addEventListener('keydown', e => {
				if(e.key === 'Escape') {
					closeModal();
					bgPanel.classList.remove('show');
					colorPanel.classList.remove('show');
					[historyPopup, bookmarksPopup, downloadsPopup, ipPopup].forEach(p => p.style.display = 'none');
				}
			});
		}
		init();
	})();