define("SNB.password.js",[],function(){function t(t){for(modes=0,i=0;4>i;i++)1&t&&modes++,t>>>=1;return modes}function h(i){return i>=48&&57>=i?1:i>=65&&90>=i?2:i>=97&&122>=i?4:8}function s(){this.hex_chr="0123456789abcdef"}s.prototype.rhex=function(i){for(str="",j=0;3>=j;j++)str+=this.hex_chr.charAt(i>>8*j+4&15)+this.hex_chr.charAt(i>>8*j&15);return str},s.prototype.str2blks_MD5=function(t){for(nblk=(t.length+8>>6)+1,blks=new Array(16*nblk),i=0;16*nblk>i;i++)blks[i]=0;for(i=0;i<t.length;i++)blks[i>>2]|=t.charCodeAt(i)<<i%4*8;return blks[i>>2]|=128<<i%4*8,blks[16*nblk-2]=8*t.length,blks},s.prototype.add=function(i,t){var h=(65535&i)+(65535&t),s=(i>>16)+(t>>16)+(h>>16);return s<<16|65535&h},s.prototype.rol=function(i,t){return i<<t|i>>>32-t},s.prototype.cmn=function(i,t,h,s,r,n){return this.add(this.rol(this.add(this.add(t,i),this.add(s,n)),r),h)},s.prototype.ff=function(i,t,h,s,r,n,o){return this.cmn(t&h|~t&s,i,t,r,n,o)},s.prototype.gg=function(i,t,h,s,r,n,o){return this.cmn(t&s|h&~s,i,t,r,n,o)},s.prototype.hh=function(i,t,h,s,r,n,o){return this.cmn(t^h^s,i,t,r,n,o)},s.prototype.ii=function(i,t,h,s,r,n,o){return this.cmn(h^(t|~s),i,t,r,n,o)},s.prototype.md5=function(t){x=this.str2blks_MD5(t);var h=1732584193,s=-271733879,r=-1732584194,n=271733878;for(i=0;i<x.length;i+=16){var o=h,f=s,e=r,g=n;h=this.ff(h,s,r,n,x[i+0],7,-680876936),n=this.ff(n,h,s,r,x[i+1],12,-389564586),r=this.ff(r,n,h,s,x[i+2],17,606105819),s=this.ff(s,r,n,h,x[i+3],22,-1044525330),h=this.ff(h,s,r,n,x[i+4],7,-176418897),n=this.ff(n,h,s,r,x[i+5],12,1200080426),r=this.ff(r,n,h,s,x[i+6],17,-1473231341),s=this.ff(s,r,n,h,x[i+7],22,-45705983),h=this.ff(h,s,r,n,x[i+8],7,1770035416),n=this.ff(n,h,s,r,x[i+9],12,-1958414417),r=this.ff(r,n,h,s,x[i+10],17,-42063),s=this.ff(s,r,n,h,x[i+11],22,-1990404162),h=this.ff(h,s,r,n,x[i+12],7,1804603682),n=this.ff(n,h,s,r,x[i+13],12,-40341101),r=this.ff(r,n,h,s,x[i+14],17,-1502002290),s=this.ff(s,r,n,h,x[i+15],22,1236535329),h=this.gg(h,s,r,n,x[i+1],5,-165796510),n=this.gg(n,h,s,r,x[i+6],9,-1069501632),r=this.gg(r,n,h,s,x[i+11],14,643717713),s=this.gg(s,r,n,h,x[i+0],20,-373897302),h=this.gg(h,s,r,n,x[i+5],5,-701558691),n=this.gg(n,h,s,r,x[i+10],9,38016083),r=this.gg(r,n,h,s,x[i+15],14,-660478335),s=this.gg(s,r,n,h,x[i+4],20,-405537848),h=this.gg(h,s,r,n,x[i+9],5,568446438),n=this.gg(n,h,s,r,x[i+14],9,-1019803690),r=this.gg(r,n,h,s,x[i+3],14,-187363961),s=this.gg(s,r,n,h,x[i+8],20,1163531501),h=this.gg(h,s,r,n,x[i+13],5,-1444681467),n=this.gg(n,h,s,r,x[i+2],9,-51403784),r=this.gg(r,n,h,s,x[i+7],14,1735328473),s=this.gg(s,r,n,h,x[i+12],20,-1926607734),h=this.hh(h,s,r,n,x[i+5],4,-378558),n=this.hh(n,h,s,r,x[i+8],11,-2022574463),r=this.hh(r,n,h,s,x[i+11],16,1839030562),s=this.hh(s,r,n,h,x[i+14],23,-35309556),h=this.hh(h,s,r,n,x[i+1],4,-1530992060),n=this.hh(n,h,s,r,x[i+4],11,1272893353),r=this.hh(r,n,h,s,x[i+7],16,-155497632),s=this.hh(s,r,n,h,x[i+10],23,-1094730640),h=this.hh(h,s,r,n,x[i+13],4,681279174),n=this.hh(n,h,s,r,x[i+0],11,-358537222),r=this.hh(r,n,h,s,x[i+3],16,-722521979),s=this.hh(s,r,n,h,x[i+6],23,76029189),h=this.hh(h,s,r,n,x[i+9],4,-640364487),n=this.hh(n,h,s,r,x[i+12],11,-421815835),r=this.hh(r,n,h,s,x[i+15],16,530742520),s=this.hh(s,r,n,h,x[i+2],23,-995338651),h=this.ii(h,s,r,n,x[i+0],6,-198630844),n=this.ii(n,h,s,r,x[i+7],10,1126891415),r=this.ii(r,n,h,s,x[i+14],15,-1416354905),s=this.ii(s,r,n,h,x[i+5],21,-57434055),h=this.ii(h,s,r,n,x[i+12],6,1700485571),n=this.ii(n,h,s,r,x[i+3],10,-1894986606),r=this.ii(r,n,h,s,x[i+10],15,-1051523),s=this.ii(s,r,n,h,x[i+1],21,-2054922799),h=this.ii(h,s,r,n,x[i+8],6,1873313359),n=this.ii(n,h,s,r,x[i+15],10,-30611744),r=this.ii(r,n,h,s,x[i+6],15,-1560198380),s=this.ii(s,r,n,h,x[i+13],21,1309151649),h=this.ii(h,s,r,n,x[i+4],6,-145523070),n=this.ii(n,h,s,r,x[i+11],10,-1120210379),r=this.ii(r,n,h,s,x[i+2],15,718787259),s=this.ii(s,r,n,h,x[i+9],21,-343485551),h=this.add(h,o),s=this.add(s,f),r=this.add(r,e),n=this.add(n,g)}return this.rhex(h)+this.rhex(s)+this.rhex(r)+this.rhex(n)},SNB.Password={},SNB.Password={encryPw:function(i){var t=new s;return t.md5(i).toUpperCase()},checkStrong:function(s){if(""==s)return-1;var r=0;for(i=0;i<s.length;i++)r|=h(s.charCodeAt(i));return t(r)},showPwdStrong:function(i,t){if(i.length>=6){var h=SNB.Password.checkStrong(i);1==h||0==h||-1==h?t.html("<img src='"+SNB.domain["static"]+"/images/icon_ok.png'>  密码强度：弱").css("color","#0E931C"):2==h?t.html("<img src='"+SNB.domain["static"]+"/images/icon_ok.png'>  密码强度：中").css("color","#0E931C"):(3==h||4==h)&&t.html("<img src='"+SNB.domain["static"]+"/images/icon_ok.png'>  密码强度：强").css("color","#0E931C")}}}});