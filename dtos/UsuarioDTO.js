class UsuarioDTO {
    constructor({ id, email, password, name, lastname, phone, image }) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastname = lastname;
        this.phone = phone;
        this.image = image;
    }
}

export default function userToDTO(usuario) {
    if (Array.isArray(usuario))
        return usuario.map(u => new UsuarioDTO(u));
    else
        return new UsuarioDTO(usuario);
}