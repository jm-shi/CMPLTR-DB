$(document).ready(function () {
  $('.circular-btn').click(function () {
    $(this).toggleClass('btn-dark');
  });

  $('button.monday').click(function () {
    if ($('input.monday').is(':checked')) {
      $('input.monday').prop('checked', false);
    } else {
      $('input.monday').prop('checked', true);
    }
  });
  $('button.tuesday').click(function () {
    if ($('input.tuesday').is(':checked')) {
      $('input.tuesday').prop('checked', false);
    } else {
      $('input.tuesday').prop('checked', true);
    }
  });
  $('button.wednesday').click(function () {
    if ($('input.wednesday').is(':checked')) {
      $('input.wednesday').prop('checked', false);
    } else {
      $('input.wednesday').prop('checked', true);
    }
  });
  $('button.thursday').click(function () {
    if ($('input.thursday').is(':checked')) {
      $('input.thursday').prop('checked', false);
    } else {
      $('input.thursday').prop('checked', true);
    }
  });
  $('button.friday').click(function () {
    if ($('input.friday').is(':checked')) {
      $('input.friday').prop('checked', false);
    } else {
      $('input.friday').prop('checked', true);
    }
  });
  $('button.saturday').click(function () {
    if ($('input.saturday').is(':checked')) {
      $('input.saturday').prop('checked', false);
    } else {
      $('input.saturday').prop('checked', true);
    }
  });
  $('button.sunday').click(function () {
    if ($('input.sunday').is(':checked')) {
      $('input.sunday').prop('checked', false);
    } else {
      $('input.sunday').prop('checked', true);
    }
  });
});