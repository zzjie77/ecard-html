define("widget/repost_comment.js",["SNB.editor"],function(t,e,i){function a(){var t=c();$(".ueditor-wrapper, textarea",n).removeClass("error"),t>r?d.html("已超出<em>"+(t-r)+"</em>字").css("color","#C30801"):d.html("还能输入<em>"+(r-t)+"</em>字").css("color","")}function o(){var t=l(),e=n.data("id"),i=n.data("cid"),a=c();if(a>SNB.Util.MAX_STATUS_WORDS)return m.$uew.addClass("error"),!1;n.dialog("close");var o={id:e,cid:i,comment:t,forward:1,split:!0};SNB.post("/statuses/reply.json",o,function(){},function(t){t.status&&200!=t.status&&SNB.Util.failDialog("转发失败")})}var n=$("#dialog-repost-comment");if(!n.length){var s='<div id="dialog-repost-comment" class="dialog-wrapper" style="display:none"><textarea></textarea><p class="counttxt"><span class="showFaceButton" title="表情">&nbsp;</span><span class="addStock" title="股票">&nbsp</span><span class="wordsRemain"></span></p><p style="text-align:center"><input type="submit" class="submit" value="确定"/><input type="button" class="cancel button" value="取消"/></p></div>';n=$(s).appendTo("body>.temp")}n.find(".cancel").click(function(){n.dialog("close")});var r=SNB.Util.MAX_STATUS_WORDS,d=n.find(".wordsRemain"),l=function(t){var e=SNB.Util.cleanContent(m.getContent(),!1,m.editor);return t&&(e=e.replace(/&nbsp;/gi," ")),e=e.replace(/<br>/gi,"\n")},c=function(){return SNB.Util.getWordsCount(l(!0))},u=n.find("textarea");n.find(".submit").click(o);var p=t("SNB.editor.js"),m=p.init(n,{$emotion:$(".showFaceButton",n),$stock:$(".addStock",n),ctrlReturn:!0,submitFunc:o,insertFunc:a}),f=$.Deferred(),g=f.promise();u.focus(a),u.bind("keyup",a),n.hide(),e=i.exports=function(t,e,i){n.dialog({modal:"true",width:"520px",title:"转发到我的首页"}),n.data("id",t).data("cid",e),$.browser.isMobile?f.resolve(m):m.editor||m.upgrade({autoheight:!1},function(){$(".ueditor-wrapper",n).height(100),m.editor.addListener("keyup",a),f.resolve(m)});var o=i||"";g.done(function(t){t.reset(o,!0,!0),a()}),SNB.Util.dialog_vertical_middle(n.closest(".ui-dialog"))}});