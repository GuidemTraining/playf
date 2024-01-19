$(document).ready(function() {
  if (typeof(CoursePlayerV2) !== 'undefined') {
    // Listen for the content change event
    CoursePlayerV2.on('hooks:contentDidChange', function(data) {
      // Extract course details
      var courseId = data.course.id;
      var courseName = data.course.name;
      var courseSlug = data.course.slug;
      
      // Extract lesson details
      var lessonId = data.lesson.id;
      var lessonName = data.lesson.name;
      var lessonSlug = data.lesson.slug;
      
      // Extract chapter details
      var chapterName = data.chapter.name;
      var chapterId = data.chapter.id; // Assuming there's a chapter ID
      
      // Extract user details
      var userId = data.user.id;
      var userName = data.user.full_name;
      var userEmail = data.user.email;
      
      // Print everything to the console
      console.log('Course ID:', courseId);
      console.log('Course Name:', courseName);
      console.log('Course Slug:', courseSlug);
      console.log('Lesson ID:', lessonId);
      console.log('Lesson Name:', lessonName);
      console.log('Lesson Slug:', lessonSlug);
      console.log('Chapter ID:', chapterId);
      console.log('Chapter Name:', chapterName);
      console.log('User ID:', userId);
      console.log('User Name:', userName);
      console.log('User Email:', userEmail);
      
      // ...rest of your code for handling embeds or other operations
    });
  }
});
