eval(function(p, a, c, k, e, d) {
    e = function(c) {
        return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    };
    if (!''.replace(/^/, String)) {
        while (c--) {
            d[e(c)] = k[c] || e(c)
        }
        k = [function(e) {
            return d[e]
        }];
        e = function() {
            return '\\w+'
        };
        c = 1
    }
    while (c--) {
        if (k[c]) {
            p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
        }
    }
    return p
}('$(d).r(f(){3 t(){q("<1 8=\'7:9;\'><1 4=\'b-2\'>c</1><a 4=\'5-6 6 6 6\'>d</a></1>").4To("#0-2").e("<a 4=\'5-6 6 6 6 6-6;f:10;g:10;h:10;3-i:3;\'><1 4=\'b-2\'><1 8=\'j\'></1><a 4=\'5 5-6 6 6\'>k</a></1></a>").4To("#0-2");o("<a 4=\'l-6 6 6-6-6;f:10;g:10;h:10;3-i:3;\'><1 4=\'b-2\'>m n</1><a 4=\'5-6 6 6 6\'>d</a></a>").4To("#0-2");7("#p-2 .1-2 .1-2-1").1("1",1(){$("#0-2 .o-2 .1-2-1").p("q r: "+s($("#g-2").t())),$("#2-2").u(),$("#g-2").v()})}u(e(e(C)!=="z")?C.x():C()!=="z"?C():C().x()).w('E',function(){$(f(){setTimeout(function(){t()},0)})});8(7 h G!=="z"){7.h("H:I",function(){$(f(){setTimeout(function(){t()},0)})})}C.v(function(t){var e={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',\'"'"'":"'"'"'&#039;"};t=t.s(/[&<>"'"]/g,function(t){e.t(t)})})}', 62, 88, 'flag_input|kapow_submit|function|add_submit_btn|appendTo|style|padding|border|none|borderRadius|4px|backgroundColor|007bff|color|white|fontSize|16px|cursor|pointer|transition|background_color|display|flex|alignItems|center|submit_text|kapow_submit_btn|click|kapow_submit|flag_form|submit_logic|alert|custom_alert|show|close_alert|custom_alert_btn|custom_alert_content|val|Submitted Answer|setTimeout|1000|CoursePlayerV2|hooks|contentDidChange|ready|CoursePlayerV2Hooks|function_exists|course_player|hooks_contentDidChange|else|ready_function|content|function_exists_returned|if|const|add_submit_btn_returned|content_DidChange|1000_close_alert_button|function_with_sanitization|typeof|String|replace|while|eval|unescape'.split('|'), 0, {}))
