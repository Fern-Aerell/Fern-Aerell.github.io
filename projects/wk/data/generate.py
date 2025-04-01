import os, random, json

image_folder_path = 'images'

image_file_list = [f for f in os.listdir(image_folder_path) if os.path.isfile(os.path.join(image_folder_path, f))]

def generate_random_number(start, end):
    return random.randint(start, end)

images_json_data = []
texts_json_data = []

def images_json_data_append(image, lucu, biasa):
    images_json_data.append({'image': image,'lucu': lucu,'biasa': biasa})

def texts_json_data_append(text, lucu, biasa):
    texts_json_data.append({'text': text,'lucu': lucu,'biasa': biasa})

for image_file_name in image_file_list:
    images_json_data_append(image=image_file_name, lucu=generate_random_number(0, 100), biasa=generate_random_number(0, 100))

with open('images.json', '+w') as file:
    file.write(json.dumps(images_json_data))

with open('texts.txt', '+r') as file:
    for text in file.read().splitlines():
        texts_json_data_append(text=text, biasa=generate_random_number(0, 100), lucu=generate_random_number(0, 100))

with open('texts.json', '+w') as file:
    file.write(json.dumps(texts_json_data))