$(document).ready(function () {
  // Restore accordion state from localStorage
  const savedState = JSON.parse(localStorage.getItem("accordionState")) || [];
  savedState.forEach((state) => {
    const section = $(".accordion-section").eq(state.index);
    section.find(".accordion-title").text(state.title);
    if (state.active) {
      section.addClass("active");
    }
  });

  let sectionCount = $(".accordion-section").length;

  // Toggle accordion sections
  $(document).on("click", ".accordion-title", function (e) {
    const section = $(this).parent();
    if (e.ctrlKey) {
      section.toggleClass("active");
    } else {
      $(".accordion-section").not(section).removeClass("active");
      section.toggleClass("active");
    }
    saveAccordionState();
  });

  // Add new section
  $("#add-section").on("click", function () {
    sectionCount++;
    const newSection = `
      <div class="accordion-section">
        <div class="accordion-title" contenteditable="true">New Section ${sectionCount}</div>
         <i class="fa-solid fa-trash remove-section"></i>
        <div class="accordion-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi fuga quasi
                placeat voluptas aliquid esse repellendus aut quos quisquam? Molestiae, blanditiis. Ipsum, incidunt? Eum
                voluptatum inventore ea voluptas ratione doloremque!</div>
      </div>`;
    $(".accordion").append(newSection);
    saveAccordionState();
  });

  // Remove specific section
  $(document).on("click", ".remove-section", function () {
    $(this).parent().remove();
    saveAccordionState();
  });

  // Remove last section
  $("#remove-section").on("click", function () {
    $(".accordion-section").last().remove();
    sectionCount--;
    saveAccordionState();
  });

  // Save accordion state to localStorage
  function saveAccordionState() {
    const state = [];
    $(".accordion-section").each(function (index) {
      const title = $(this).find(".accordion-title").text();
      const active = $(this).hasClass("active");
      state.push({ index, title, active });
    });
    localStorage.setItem("accordionState", JSON.stringify(state));
  }
});
