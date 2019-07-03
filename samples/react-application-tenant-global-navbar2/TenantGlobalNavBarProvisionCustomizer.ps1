#Connect-PnPOnline "https://<your-tenant>.sharepoint.com/sites/<your-site>" -UseWebLogin

Add-PnPCustomAction -Title "TenantGlobalNavBarCustomAction" `
					-Name "TenantGlobalNavBarCustomAction" `
					-Location "ClientSideExtension.ApplicationCustomizer" `
					-ClientSideComponentId "33ebce34-5b96-4e6e-b470-5eaea3b7e070" `
					-ClientSideComponentProperties "{""TopMenuTermSet"":""TenantGlobalNavBar"",""BottomMenuTermSet"":""TenantGlobalFooterBar""}"