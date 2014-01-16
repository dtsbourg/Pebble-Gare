#include "pebble.h"

static Window *window;

static TextLayer *time_layer;
static TextLayer *timet_layer;
static TextLayer *direction_layer;
static TextLayer *directiond_layer;
static TextLayer *location_layer;


static AppSync sync;
static uint8_t sync_buffer[64];

enum TLKey {
  TL_LOCATION_KEY = 0x0,         // TUPLE_CSTRING
  TL_TIME_KEY = 0x1,             // TUPLE_CSTRING
  TL_DIRECTION_KEY = 0x2,        // TUPLE_CSTRING
  TL_TIMET_KEY  = 0x3,      // TUPLE_CSTRING
};



static void sync_error_callback(DictionaryResult dict_error, AppMessageResult app_message_error, void *context) {
  APP_LOG(APP_LOG_LEVEL_DEBUG, "App Message Sync Error: %d", app_message_error);
}

static void sync_tuple_changed_callback(const uint32_t key, const Tuple* new_tuple, const Tuple* old_tuple, void* context) {
  switch (key) {
    case TL_LOCATION_KEY:
      text_layer_set_text(location_layer, new_tuple->value->cstring);

    case TL_TIME_KEY:
      text_layer_set_text(time_layer, new_tuple->value->cstring);
      break;

    case TL_TIMET_KEY:
      text_layer_set_text(timet_layer, new_tuple->value->cstring);
      break;

    case TL_DIRECTION_KEY:
      text_layer_set_text(direction_layer, new_tuple->value->cstring);
      text_layer_set_text(directiond_layer, new_tuple->value->cstring);
      break;
  }
}

static void send_cmd(void) {
  Tuplet value = TupletInteger(1, 1);

  DictionaryIterator *iter;
  app_message_outbox_begin(&iter);

  if (iter == NULL) {
    return;
  }

  dict_write_tuplet(iter, &value);
  dict_write_end(iter);

  app_message_outbox_send();
}

static void window_load(Window *window) {
  Layer *window_layer = window_get_root_layer(window); 

  location_layer = text_layer_create(GRect(0, 10, 144, 20));
  text_layer_set_text_color(location_layer, GColorWhite);
  text_layer_set_background_color(location_layer, GColorClear);
  text_layer_set_font(location_layer, fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD));
  text_layer_set_text_alignment(location_layer, GTextAlignmentCenter);
  layer_add_child(window_layer, text_layer_get_layer(location_layer));

  time_layer = text_layer_create(GRect(0, 115, 144, 20));
  text_layer_set_text_color(time_layer, GColorWhite);
  text_layer_set_background_color(time_layer, GColorClear);
  text_layer_set_font(time_layer, fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD));
  text_layer_set_text_alignment(time_layer, GTextAlignmentLeft);
  layer_add_child(window_layer, text_layer_get_layer(time_layer));

  timet_layer = text_layer_create(GRect(0, 75, 144, 20));
  text_layer_set_text_color(timet_layer, GColorWhite);
  text_layer_set_background_color(timet_layer, GColorClear);
  text_layer_set_font(timet_layer, fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD));
  text_layer_set_text_alignment(timet_layer, GTextAlignmentLeft);
  layer_add_child(window_layer, text_layer_get_layer(timet_layer));

  direction_layer = text_layer_create(GRect(0, 115, 144, 20));
  text_layer_set_text_color(direction_layer, GColorWhite);
  text_layer_set_background_color(direction_layer, GColorClear);
  text_layer_set_font(direction_layer, fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD));
  text_layer_set_text_alignment(direction_layer, GTextAlignmentRight);
  layer_add_child(window_layer, text_layer_get_layer(direction_layer));

  directiond_layer = text_layer_create(GRect(0, 75, 144, 20));
  text_layer_set_text_color(directiond_layer, GColorWhite);
  text_layer_set_background_color(directiond_layer, GColorClear);
  text_layer_set_font(directiond_layer, fonts_get_system_font(FONT_KEY_GOTHIC_18_BOLD));
  text_layer_set_text_alignment(directiond_layer, GTextAlignmentRight);
  layer_add_child(window_layer, text_layer_get_layer(directiond_layer));
  

  Tuplet initial_values[] = {
    TupletCString(TL_LOCATION_KEY, "Pebble-Flon"),
    TupletCString(TL_TIME_KEY, "12:34"),
    TupletCString(TL_DIRECTION_KEY, "Pebble-Gare"),
    TupletCString(TL_TIMET_KEY, "12:34"),
  };

  app_sync_init(&sync, sync_buffer, sizeof(sync_buffer), initial_values, ARRAY_LENGTH(initial_values),
      sync_tuple_changed_callback, sync_error_callback, NULL);

  send_cmd();
}

static void window_unload(Window *window) {
  app_sync_deinit(&sync);

  text_layer_destroy(direction_layer);
  text_layer_destroy(directiond_layer);
  text_layer_destroy(time_layer);
  text_layer_destroy(timet_layer);
  text_layer_destroy(location_layer);
}

static void init(void) {
  window = window_create();
  window_set_background_color(window, GColorBlack);
  window_set_fullscreen(window, true);
  window_set_window_handlers(window, (WindowHandlers) {
    .load = window_load,
    .unload = window_unload
  });

  const int inbound_size = 64;
  const int outbound_size = 64;
  app_message_open(inbound_size, outbound_size);

  const bool animated = true;
  window_stack_push(window, animated);
}

static void deinit(void) {
  window_destroy(window);
}

int main(void) {
  init();
  app_event_loop();
  deinit();
}
