#!/usr/bin/env node

import Minimist from "minimist";
import Xcode from "xcode-node";

const argv = Minimist(process.argv.slice(2))

if (argv._.length == 0) {
    process.exit(1)
}

const project = new Xcode(argv._[0])

if (argv['duplicate-environment']) {
    if (typeof argv['duplicate-environment'] == "string") {
        const [key, value] = argv['duplicate-environment'].split("->")
        project.configuration.duplicateConfiguration(key, value);
    }
    else {
        for (let i = 0; i < argv['duplicate-environment'].length; i++) {
            const [key, value] = argv['duplicate-environment'][i].split("->")
            project.configuration.duplicateConfiguration(key, value);
        }
    }
}

if (argv['set-user-defined']) {
    if (typeof argv['set-user-defined'] == "string") {
        const [key, value] = argv['set-user-defined'].split("->")
        project.getTargets().forEach((tg) => {
            project.configuration.setUserDefinedTarget(tg.name, key, value);
        });
    }
    else {
        for (let i = 0; i < argv['set-user-defined'].length; i++) {
            const [key, value] = argv['set-user-defined'][i].split("->")
            project.getTargets().forEach((tg) => {
                project.configuration.setUserDefinedTarget(tg.name, key, value);
            });
        }
    }
}

if (argv['set-user-defined-configuration']) {
    if (typeof argv['set-user-defined-configuration'] == "string") {
        const [conf, key, value] = argv['set-user-defined-configuration'].split("->")
        project.getTargets().forEach((tg) => {
            project.configuration.setUserDefinedTargetConfiguration(tg.name, conf, key, value);
        });
    }
    else {
        for (let i = 0; i < argv['set-user-defined-configuration'].length; i++) {
            const [conf, key, value] = argv['set-user-defined-configuration'][i].split("->")
            project.getTargets().forEach((tg) => {
                project.configuration.setUserDefinedTargetConfiguration(tg.name, conf, key, value);
            });
        }
    }
}

if (argv['set-headers-path']) {
    if (typeof argv['set-headers-path'] == "string") {
        project.getTargets().forEach((tg) => {
            project.configuration.setHeadersPathTarget(tg.name, argv['set-headers-path'].split());
        });
    }
    else {
        project.getTargets().forEach((tg) => {
            project.configuration.setHeadersPathTarget(tg.name, argv['set-headers-path']);
        });
    }
}

if (argv['set-preprocessor-macros-specific']) {
    if (typeof argv['set-preprocessor-macros-specific'] == "string") {
	const [target, conf, macros] = argv['set-preprocessor-macros-specific'].split("->")
        project.configuration.setPreprocessorMacrosTargetConfiguration(target, conf, macros.split(","));
    }
    else {
	for (let i = 0; i < argv['set-preprocessor-macros-specific'].length; i++) {
	    const [target, conf, macros] = argv['set-preprocessor-macros-specific'][i].split("->")
	    project.configuration.setPreprocessorMacrosTargetConfiguration(target, conf, macros.split(","));
	}
    }
}

if (argv['set-build-phase-script']) {
    if (typeof argv['set-build-phase-script'] == "string") {
        const [target, script, name] = argv['set-build-phase-script'].split("->")
        project.buildphase.addScript(target, script, name);
    }
    else {
        for (let i = 0; i < argv['set-build-phase-script'].length; i++) {
            const [target, script, name] = argv['set-build-phase-script'][i].split("->")
            project.buildphase.addScript(target, script, name);
        }
    }
}

if (argv['output'] && typeof argv['output'] == "string") {
    project.save(argv['output'])
}
else {
    process.stdout.write(project.toString());
}
