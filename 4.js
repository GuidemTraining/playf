$(document).ready(function(){const t=function(){$("<div class='kapow-submit'>").appendTo("#flag-form").html("<div class='kapow-submit-btn' style='padding:10px;border:none;border-radius:4px;background-color:#007bff;color:white;font-size:16px;cursor:pointer;transition:background-color 0.2s;'><span class='submit-text' style='padding-left:5px;'>Submit</span></div>").on("click",".kapow-submit .kapow-submit-btn",function(){var t=$("#flag-input").val();$("#alert-content").html("Submitted Answer: "+function(t){var e={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'};return t.replace(/[&<>"']/g,function(t){return e[t]})}(t)),$("#custom-alert").show(),$("#close-alert").click(function(){$("#custom-alert").hide()})});};typeof CoursePlayerV2!=="undefined"?CoursePlayerV2.on("hooks:contentDidChange",function(){$(function(){setTimeout(function(){t()},1e3)})}):t(),function(t){var e={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'};t=t.replace(/[&<>"']/g,function(t){return e[t]});}(t);});
