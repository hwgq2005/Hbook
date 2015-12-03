/*
 *
 * @authors H君 (qq:262281610)
 * @date    2015-11-05 11:42:02
 * @version $Id$
 */

define([
	'jquery',
	'global',
	'juicer',
	'text!../../templates/topic-detail.htm',
	'text!../../templates/topic-comment.htm',
	'text!../../templates/comment-dialog.htm',
	'tPage',
	'login',
	'mousewheel',
	'tScroll',
	'tForm'
], function($, global, j, topicIndex, topicComment, commentDialog , tPage) {
	var init = function() {
		var topicDetail = $('#topic-detail');
		var commentD = $('#comment-dialog');
		var commentList = $('#comment-list');
		var themeId = getQueryString('id');
		var userData;
		
		var format = function(data)
		{
			return timeFormat(new Date().Format("yyyy-MM-dd hh:mm:ss"),data);
		}
		
		juicer.register('format',format);
		
		// juicer.set('cache',false)
		require(['baidueditor', 'zeroclipboard', 'bdlang'], function(UE, zcl) {
			window.ZeroClipboard = zcl;
			

			//话题详情模板
			getAjax('circle/getThemeDetail.html', 'get', {id: themeId}, function(data) {
				topicDetail.html(juicer(topicIndex, data));
				console.log(data)
				//圈子显示信息
				function circleMsg(){
					var state=false;
					var time;
					topicDetail.find('.msg-box').hover(function() {
						$(this).find('.my-circle-c').show();
						// time=setTimeout(function(){
						// 	state=true;
						// },1000)

					}, function() {
						var _this=$(this);
						
						// clearTimeout(time);
						// if (!state) {
							_this.find('.my-circle-c').hide();
						// };
						
					});
				}
				circleMsg();
				$('#detail-good').click(function(event) {
					if(!checkUser())//检查登录
						return;
					var $this=$(this);
					var goodsData={
							objId:themeId,
							objType:1,
							attitude:0
						}
					getAjax('common/declare.html', 'post', goodsData, function(data) {
						if(data.returnCode == '0000')
						{
							var _thisNum=$this.find('.num').text();
						    _thisNum++;
						    $this.find('.num').text(_thisNum);
						}else if(data.returnCode == 'ATTITUDE-0001')
							showMessages('您已经对该主题点过赞了');
						else
							showMessages('请稍后再试');
					})
				});
			})
			

			// 回复详情模板
			
			getAjax('circleReply/getReplyCount.html', 'get', {id: themeId}, function(data) {
				 userData=data.data.user;
			 	commentD.html(juicer(commentDialog, data));
			 	

				var comment = new baidu.editor.ui.Editor({
									//这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
					toolbars: [
						['emotion','simpleupload']
					],
					//focus时自动清空初始化时的内容
					autoClearinitialContent: true,
					//关闭字数统计
					wordCount: false,
					//关闭elementPath
					elementPathEnabled: false//默认的编辑区域高度
						,
					initialFrameHeight: 70
						// ,autoHeightEnabled:false
						//更多其他参数，请参考ueditor.config.js中的配置项
						,
					emotionLocalization: true //是否开启表情本地化，默认关闭。若要开启请确保emotion文件夹下包含官网提供的images表情文件夹
					,
					scaleEnabled:false,
					enableAutoSave: false,
					contextMenu: [] //去除右键菜单
				})
				comment.render( 'editor');
				comment.ready( function( editor ) {
					comment.focus();
				})
				comment.addListener('focus', function(type, event) {
					$('#editor').find('.edui-default.edui-editor').css({
						border: '2px solid #33CCCC'
					});
					var len=comment.getContentLength();
					if  (len == 0) {
						$('#sub-comment').find('i').css({
							opacity: 0.1
						});
					}else{
						$('#sub-comment').find('i').css({
							opacity: 0.5
						});
					};
				})
				comment.addListener('blur', function(type, event) {
					$('#editor').find('.edui-default.edui-editor').css({
						border: '2px solid #ccc'
					});
				})
				comment.addListener('contentChange', function(type, event) {
					var len=comment.getContentLength();
					if (len == 0) {
						$('#sub-comment').find('i').css({
							opacity: 0.1
						});
					}else{
						$('#sub-comment').find('i').css({
							opacity: 0.5
						});
					};
				})
				$('#sub-comment').click(function(event) {
					if(!checkUser())//检查登录
						return;
					var $this=$(this);
					var $num=$this.parent().prev().find('span i');
					var num=$num.text();
					// var str = getPlainText('editor');
					var str = comment.getContent();
					console.log(str);
					
					//校验回复内容长度
					if($.trim(str).length == 0){
						showMessages('请输入内容');
						return;
					}
					if($.trim(str).length > 2000)
					{
						showMessages('回复内容应在2000字符内');
						return;
					}
					
//					var html = $.parseHTML(str,false);
					var overviewPhotos = '';
					var html = $('<div>'+str+'</div>');
					var imgs = html.find('img:not(".icon-emotion")');
					if(imgs && imgs.length > 0){
						for(var i=0;i<imgs.length;i++)
						{
							overviewPhotos=overviewPhotos+imgs.attr('tlink')+',';
						}
						overviewPhotos = overviewPhotos.substring(0,overviewPhotos.length-1);
					}
					var data={
						themeId: themeId,
						content:str,
						overviewPhotos:overviewPhotos
					}
					
					getAjax('circleReply/create.html', 'post', data, function(data) {
						var _html = '<div class="around first-around">'
						+'<div class="left-mark">' + '<a href="circle/user.html?userId='+userData.id+'&userName='+userData.nickName+'"><img src="'+data.resUrl+"user/"+userData.portraitSuffix+'" alt=""/></a></div>' 
						+ '<div class="right-summary one-sumary">'
						+ '<div class="right-summary-hover one-comment">' 
						+ '<p class="msg"><a href="circle/user.html?userId='+userData.id+'&userName='+userData.nickName+'"><span class="name">'+userData.nickName+'</span></a><span class="time">'+timeFormat(new Date().Format("yyyy-MM-dd hh:mm:ss"),new Date().Format("yyyy-MM-dd hh:mm:ss"))+'</span></p>'
						 + '<div class="right-summary-p">' + data.data.content + '</div>' 
						 + '<p class="operation msg"><a href="javascript:;" class="report" data-userid="'+userData.id+'" data-action="report" data-mainId="'+data.data.id+'" data-causetype="0">' 
						 + '<span class="">举报 ▼</span></a><span class="span-1">|</span>' 
						 + '<a href="javascript:;" class="goods" data-action="goods" data-mainId="'+data.data.id+'"><span class="red"><i class="icon-16 icon-good"></i> <i class="goods-num">0</i></span></a>' 
						 + '<span class="span-1">|</span>' 
						 + '<a href="javascript:;" class="reply first-reply" data-action="reply"  data-mainId="'+data.data.id+'"  data-isopen="false" data-counts="0" data-toggle="false">' 
						 + '<span class="comment"><i class="icon-16 icon-comment"></i> <i class="reply-num">0</i> ▼</span></a>'
						 + '</p></div></div></div>';
						$('#my-comment').append(_html);
						num++;
						$num.text(num++)
						$this.parent().prev().find('span i').text();
						comment.setContent('');
						showMessages('回复成功');
					})
				});



				// 加载回复（这里涉及到定位到指定回复）
				var commentIndex = getQueryString('commentIndex');
				if (commentIndex) {
					setTimeout(function() {
						getDataList(Math.ceil(commentIndex / 10), function() {
							var _comment = $('#comment_' + getQueryString('commentId'));
							if (_comment.length > 0) {
								$(window).scrollTop(_comment.offset().top);
							}
						});
					}, 200);
				} else {
					getDataList(1);
				}
				



			});

		
			


			

			function getDataList(p, callback) {
				// 每页显示多少条数据
				var _unit = 10;
				var data = {
					limit: _unit,
					offset: (p - 1) * _unit,
					themeId: themeId
				}
				getAjax('circleReply/getReplyList.html', 'get', data, function(replyData) {
					// var userData=replyData;
				
					// 加载评论模板
					commentList.html(juicer(topicComment, replyData));

					//生成分页
					$('#page').tPaginator({
						current: p, // 设置当前页
						pageCount: Math.ceil(replyData.data.total / _unit), // 设置总页数
						callback: function(p) {
							getDataList(p);
						}
					});

					// 调用回调函数
					callback && callback();


					//评论操作
					var c;
					var thisReply;
					var thisReplyNum;
					$('#my-comment').unbind('click');
					$('#my-comment').on('click', 'a', function(event) {
						var $this = $(this),
							action = $this.data('action'),
							reviewId = $this.data('reviewid'),
							mainId = $this.data('mainid'),
							name = $this.data('name'),
							isOpen = $this.attr('data-isopen'),
							toggle = $this.attr('data-toggle');
						
						var isDate = $this.parents('.first-around').find('.other-comment').length;
						if (action == 'reply') {
							var _html = '';
							thisReplyNum=$this;
							thisReplyNum=$this.parents('.first-around').find('.one-comment .reply-num');
							if (toggle == 'false') {
							
								$this.parents('.first-around').siblings().find('.textarea').remove();
								$this.parents('.first-around').find('.textarea').remove();
								_html = '<div class="textarea reply-dialog"><script id="editor-comment" type="text/plain" ></script> ' + '<a href="javascript:;" class="s-topic-btn" data-action="sub" id="sub" ><i class="icon-24 icon-right"></i></a></div>';
								// $this.parents('.one-sumary').find('.one-comment').after(_html);
								$this.parents('.one-sumary').append(_html);

								c = new baidu.editor.ui.Editor({
									//这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
									toolbars: [
										['emotion','']
									],
									//focus时自动清空初始化时的内容
									autoClearinitialContent: true,
									//关闭字数统计
									wordCount: false,
									//关闭elementPath
									elementPathEnabled: false//默认的编辑区域高度
										,
									initialFrameHeight: 70
										// ,autoHeightEnabled:false
										//更多其他参数，请参考ueditor.config.js中的配置项
										,
									emotionLocalization: true //是否开启表情本地化，默认关闭。若要开启请确保emotion文件夹下包含官网提供的images表情文件夹
									,
									enableAutoSave: false,
									contextMenu: [] //去除右键菜单
								})
								c.render( 'editor-comment');
	                            
								$('#sub').attr('data-parentId',reviewId);
								$('#sub').attr('data-mainId',mainId);
								
								$this.parents('.first-around').find('.reply').attr('data-toggle', 'false');
								$this.parents('.first-around').siblings().find('.reply').attr('data-toggle', 'false');
								$this.attr({
									'data-toggle': 'true'
								});
								
								if (!reviewId) {
									$('#sub').removeAttr('data-parentId');
								}
								$this.find('.arrow-icon').addClass('high');
									$this.parents('.other-comment').siblings('.one-comment').find('.arrow-icon').removeClass('high');
								$this.parents('.first-around').siblings().find('.arrow-icon').removeClass('high');


								// 复文本框获取焦点
								c.addListener('focus', function(type, event) {
									$('#editor-comment').find('.edui-default.edui-editor').css({
										border: '2px solid #33CCCC'
									});
								})

								// 复文本框失去焦点
								c.addListener('blur', function(type, event) {
									$('#editor-comment').find('.edui-default.edui-editor').css({
										border: '2px solid #ccc'
									});

								})
								c.addListener('contentChange', function(type, event) {
									var len=c.getContentLength();
									if (len == 0) {
										$('#sub').find('i').css({
											opacity: 0.1
										});
									}else{
										$('#sub').find('i').css({
											opacity: 0.5
										});
									};
								})

								// 复文本框加载完后执行
	                         	c.ready( function( editor ) {
	                         		var time;

	                         		clearTimeout(time);
	                         		if (name) {
                                		c.setContent(' ');
	                         			c.execCommand('inserthtml','@'+name+':')
		                            }else{
		                                c.setContent('');
		                            }
	                                c.focus();
	                               	$(window).scrollTop($this.parents('.first-around').find('.textarea').offset().top -300);
	                            });

	                            $this.parents('.around').find('.operation ').css({
	                           		'opacity': '0'
	                           	});
	                           	$this.parents('.first-around').siblings().find('.operation').css({
	                           		'opacity': '0'
	                           	});
	                           	$this.parents('.operation ').css({
	                           		'opacity': '1'
	                           	});
								
							}else{
								$this.attr({
									'data-toggle': 'false'
								});
								$this.parents('.around').find('.operation ').css({
                               		'opacity': '0'
                               	});
                               	$this.find('.arrow-icon').removeClass('high');
								$this.parents('.first-around').find('.textarea').remove();
							}
							

							
                         	
                             
						} else if (action == 'sub') {
							if(!checkUser())//检查登录
								return;
							var _html = '',
								// _id = $this.prev().attr('id'),
								// str = c.getPlainTxt();
								str = c.getContent();

							//不允许发布图片
							var $str=$('<div>'+str+'</div>')
							if ($str.find('img:not(".icon-emotion")').length > 0) {
								showMessages('禁止发布图片');
								return;
							};

							var mainReplyId=$this.attr('data-mainId');
							var parentId=$this.attr('data-parentid');
							
							//校验回复内容长度
							if($.trim(str).length == 0){
								showMessages('请输入内容');
								return;
							}
							if($.trim(str).length > 2000)
							{
								showMessages('回复内容应在2000字符内');
								return;
							}
							
							var data={
								themeId: themeId,
								content:str
							}
							
							
							//评论回复
							var data={
								themeId:themeId,
								content:str,
								mainReplyId:mainReplyId,
								parentId:parentId
							};
							getAjax('circleReply/create.html', 'post', data, function(data) {
								
								if (isDate != 0) {
									_html = '<div class="around">' 
											+ '<div class="left-mark">' 
											+ '<a href="circle/user.html?userId='+userData.id+'&userName='+userData.nickName+'"><img src="'+data.resUrl+"user/"+userData.portraitSuffix+'" alt=""></a>' 
											+ '</div>' 
											+ '<div class="right-summary">' 
											+ '<div class="right-summary-hover ">' 
											+ '<p class="msg">' 
											+ '<a href="circle/user.html?userId='+userData.id+'&userName='+userData.nickName+'"><span class="name">'+userData.nickName+'</span></a>' 
											+ '<span class="time">'+timeFormat(new Date().Format("yyyy-MM-dd hh:mm:ss"),new Date().Format("yyyy-MM-dd hh:mm:ss"))+'</span>'
											 + '</p>' 
											 + '<div class="right-summary-p">' + data.data.content + '</div>' 
											 + '<p class="operation msg">' 
											 + '<a href="javascript:;" class="report" data-action="report" data-mainId="'+mainReplyId+'" data-userid="'+userData.id+'" ><span class="">举报 ▼</span></a>' 
											 + '<span class="span-1">|</span> ' 
											 + '<a href="javascript:;" class="reply" data-action="reply" data-mainId="'+mainReplyId+'"  data-reviewid="'+data.data.id+'" data-isopen="true" data-name="'+userData.nickName+'" data-toggle="false"><span class="comment">评论</span></a>' + '</p>' 
											 + '</div>' 
											 + '</div>' 
											 + '</div>';
									$this.parents('.first-around').find('.other-comment .around-box').append(_html);
								} else {
									_html = '<div class="other-comment"><div class="around-box">'
											+'<div class="around">' 
											+ '<div class="left-mark">' 
											+ '<a href="#"><img src="'+data.resUrl+"user/"+userData.portraitSuffix+'" alt=""></a>' 
											+ '</div>' 
											+ '<div class="right-summary">' 
											+ '<div class="right-summary-hover ">' 
											+ '<p class="msg">'
											 + '<span class="name">'+userData.nickName+'</span>' 
											 + '<span class="time">'+timeFormat(new Date().Format("yyyy-MM-dd hh:mm:ss"),new Date().Format("yyyy-MM-dd hh:mm:ss"))+'</span>' 
											 + '</p>' 
											 + '<div class="right-summary-p">' + data.data.content + '</div>' 
											 + '<p class="operation msg">' 
											 + '<a href="javascript:;" class="report" data-action="report" data-mainId="'+mainReplyId+'"  data-userid="'+userData.id+'" ><span class="">举报 ▼</span></a>' 
											 + '<span class="span-1">|</span> ' + '<a href="javascript:;" class="reply" data-action="reply" data-mainId="'+mainReplyId+'"  data-reviewid="'+data.data.id+'" data-isopen="true" data-name="'+userData.nickName+'" data-toggle="false"><span class="comment">评论</span></a>' + '</p>' 
											 + '</div>' 
											 + '</div>' 
											 + '</div>'
											 + '</div>'
											 + '<div class="more-comment">'
											 +'<a href="javascript:;"  data-mainId="'+mainReplyId+'"  data-page="0" data-action="more" data-counts="0" class="more" style="display:none;">更多回复 ∨ </a>'
											 // + '<a href="javascript:;" class="reply btn btn-success btn-raduis" data-action="reply"  data-mainId="'+mainReplyId+'" data-isopen="false" >+ 回复</a>'
											 + '</div>'
											 +'</div>';
									$this.parents('.first-around').find('.one-sumary').append(_html);
								}
								var num=thisReplyNum.text();
								num++;
								thisReplyNum.text(num);
								$this.parents('.one-sumary').find('.operation').css({
                               		'opacity': '0'
                               	});
								$this.parents('.first-around').find('.reply').attr('data-isopen', 'false');
								$this.parents('.first-around').find('.textarea').remove(); 
								
								
							})
							
						}else if (action == 'goods') {
							if(!checkUser())//检查登录
								return;
							
							var goodsData={
								objId:mainId,
								objType:2,
								attitude:0
							}
							getAjax('common/declare.html', 'post', goodsData, function(data) {
								if(data.returnCode == '0000')
								{
									var _thisNum=$this.find('.goods-num').text();
									_thisNum++;
									$this.find('.goods-num').text(_thisNum);
								}else if(data.returnCode == 'ATTITUDE-0001')
									showMessages('您已经对该回复点过赞了');
								else
									showMessages('请稍后再试');
							})
						}else if (action == 'more') {
							var limit=5;
							var _html='';
							var page=$this.attr('data-page');
							var counts=$this.attr('data-counts');
							var commentListNum=$this.parents('.other-comment').find('.around').length;
							var offset=page * limit//因为默认已经查出一页
							var moreData={
								mainReplyId:mainId,
								startIndex:offset,
								pageSize:limit
							}
							if (commentListNum < counts ) {
								getAjax('circleReply/getReviewList.html', 'post', moreData, function(moreData) {
									page++;
									$this.attr('data-page', page);
									var moreData=moreData.data.list;
									$.each(moreData, function(index, val) {
										 _html += '<div class="around">' 
												+ '<div class="left-mark">' 
												+ '<a href="#"><img src="circle/images/portrait/'+val.userLogo+'" alt=""></a>' 
												+ '</div>' 
												+ '<div class="right-summary">' 
												+ '<div class="right-summary-hover ">' 
												+ '<p class="msg">' 
												+ '<span class="name">'+val.nickname+'</span>' 
												+ '<span class="time">'+timeFormat(new Date().Format("yyyy-MM-dd hh:mm:ss"),val.createDate)+'</span>'
												 + '</p>' 
												 + '<div class="right-summary-p">' + val.content + '</div>' 
												 + '<p class="operation msg">' 
												 + '<a href="javascript:;" class="report" data-action="report" data-reviewid="'+val.id+'" data-userid="'+val.opUser+'" data-causetype="1"><span class="">举报 ▼</span></a>' 
												 + '<span class="span-1">|</span> ' 
												 + '<a href="javascript:;" class="reply" data-action="reply" data-reviewid="'+val.id+'"  data-mainId="'+val.mainReplyId+'" data-isopen="true" data-name="'+val.nickname+'" data-toggle="false"><span class="comment">评论</span></a>' + '</p>' 
												 + '</div>' 
												 + '</div>' 
												 + '</div>';
									});
									$this.parents('.first-around').find('.other-comment .around-box').append(_html);
								})
							}else{
								$this.text('已显示全部');
								// $this.hide();
							};

						}else if (action == 'report') {
							if(!checkUser()) return; // 检查登录
							// 举报人的mainId

							var dialog_report = dialog({
								title: '举报',
								okValue: '提交',
								width: 400,
								cancelValue: '取消',
								autofocus: false,
								content: '<div class="report-dialog">' +
											'<div class="form-group">' +
												'<select name="reportType" id="reportType">' +
													'<option value="">请选择举报类型</option>' +
													'<option value="0">恶意广告</option>' +
													'<option value="1">内容违法</option>' +
													'<option value="2">内容淫秽</option>' +
												'</select>' +
												'<div class="form-alert"></div>' +
											'</div>' +
											'<div class="form-group">' +
												'<textarea class="t-textarea" name="reportText" id="reportText" placeholder="其他举报信息"></textarea>' +
												'<div class="form-alert"></div>' +
											'</div>' +
										'</div>',

								onshow: function() {
									$('#reportType').tSelect();
								},
								ok: function() {
									if ($('#reportType').val()) {
										if($('#reportText').val().trim().length > 500){
											showMessages('举报信息应在500字符以内');
										}else{
										var causeId = mainId
										if($this.data('causetype')=='1')
											causeId = $this.data('reviewid')
										getAjax('common/report.html', 'post', {causeType:$this.data('causetype'),causeId: causeId,type:0,defId: $this.data('userid'),causeType:$this.data('causetype'),cause:$('#reportType').val(),statement:$('#reportText').val()}, function() {
											showMessages('举报成功！');
											dialog_report.close().remove();
										});
										}
									} else {
										showMessages('请选择举报类型', {
											skin: 't-error'
										});
									}
									return false;
									
								},
								cancel: function() {}
							}).show();
						}

					});
				})
			}

			//获取纯文本内容
			function getPlainText(id) {
				var arr = [];
				arr.push(UE.getEditor(id).getPlainTxt());
				return arr.join('\n')
			}

			//创建编辑器
			function createEditor() {
				enableBtn();
				UE.getEditor('editor');
			}
			
			// 清除编辑器
			function deleteEditor() {
				disableBtn();
				UE.getEditor('editor').destroy();
			}
			
		})
	};
	init();
});
