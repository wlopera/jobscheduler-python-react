import os
import shutil
import json


class FileUtils:

    # --------------  Carpetas
    @staticmethod
    def get_folders(path):
        # Lee los directorios de la carpeta
        folders = [name for name in os.listdir(
            path) if os.path.isdir(os.path.join(path, name))]
        return folders

    @staticmethod
    def delete_folder(path):
        # Elimina la carpeta y su contenido
        shutil.rmtree(path)
        return True

    @staticmethod
    def create_folder(path, folder_name):
        # Crea una nueva carpeta en la ruta especificada
        new_folder_path = os.path.join(path, folder_name)
        os.mkdir(new_folder_path)
        os.mkdir(new_folder_path + "/jobs")
        return new_folder_path

    @staticmethod
    def rename_folder(path, old_folder_name, new_folder_name):
        # Renombra una carpeta en la ruta especificada
        old_folder_path = os.path.join(path, old_folder_name)
        new_folder_path = os.path.join(path, new_folder_name)
        os.rename(old_folder_path, new_folder_path)
        return new_folder_path

    # ----------------- Tareas
    @staticmethod
    def get_jobs(path):
        # Leer los datos desde el archivo JSON
        with open(path, 'r') as file:
            data = json.load(file)
        return data

    # ------------- Operar sobre archivos Json
    @staticmethod
    def remove_job_by_position(path, position):
        with open(path, 'r+') as file:
            data = json.load(file)
            if position < len(data):
                del data[position]
                file.seek(0)
                json.dump(data, file, indent=4)
                file.truncate()

    @staticmethod
    def add_job_at_position(path, obj, position):
        with open(path, 'r+') as file:
            data = json.load(file)
            if position <= len(data):
                data.insert(position, obj)
                file.seek(0)
                json.dump(data, file, indent=4)
                file.truncate()

    @staticmethod
    def add_job_at_last_position(path, obj):
        with open(path, 'r+') as file:
            data = json.load(file)
            data.append(obj)
            file.seek(0)
            json.dump(data, file, indent=4)
            file.truncate()
            
    @staticmethod
    def remove_jobs_by_name(path, name):
        with open(path, 'r+') as file:
            data = json.load(file)
            data = [job for job in data if job.get('name') != name]
            file.seek(0)
            json.dump(data, file, indent=4)
            file.truncate()
        
    @staticmethod
    def create_file_json(path_file):
        # Crear un archivo de configuracion
        with open(path_file, 'w') as file:
            # Escribir el diccionario vacío en el archivo como JSON
            json.dump([], file)
