Slingshot.fileRestrictions("Avatar", {
    allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
    maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited).
});

Slingshot.createDirective("Avatar", Slingshot.S3Storage, {
    bucket: "obec-bucket",
    AWSAccessKeyId:"AKIAIVP46JVMS3UM3DPQ",
    AWSSecretAccessKey:"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",
    acl: "public-read",
    authorize: function (file, metaContext) {



        return true;
    },

    key: function (file, metaContext) {

        return metaContext.avatarId + "/" + Date.now() + "-" + file.name;
    }
});